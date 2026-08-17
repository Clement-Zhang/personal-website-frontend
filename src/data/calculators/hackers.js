import { sides, programsRanking } from '@/configs/calculators/hackers.config';

function rank(ranking, node) {
    return ranking[node] ?? Object.keys(ranking).length;
}

// [[program,url]]
export const programs = Object.entries(
    import.meta.glob(
        '@/assets/images/calculators/hackers/gameImgs/programs/*.jpg',
        { eager: true, import: 'default' },
    ),
)
    .map(([path, url]) => [path.split('/').at(-1).split('.')[0], url])
    .sort(
        (before, after) =>
            rank(programsRanking, before[0]) - rank(programsRanking, after[0]),
    );

// {node:[{image,range}]}
const nodes = Object.entries(
    import.meta.glob(
        '@/assets/images/calculators/hackers/gameImgs/nodes/*/*.jpg',
        { eager: true, import: 'default' },
    ),
).reduce((acc, [path, url]) => {
    const segments = path.split('/');
    const node = segments.at(-2);
    (acc[node] ??= []).push({
        image: url,
        range: (segments.at(-1).split('.')[0] + '-1').split('-').slice(0, 2),
    });
    return acc;
}, {});

Object.values(nodes).forEach((levels) => {
    levels.sort(
        (before, after) => Number(before.range[0]) - Number(after.range[0]),
    );
});

// {side:[{image,value}]}
export const topLevel = Object.fromEntries(
    Object.entries(sides).map(([side, { ranking }]) => [
        side,
        Object.entries(nodes)
            .map(([node, levels]) => ({
                value: node,
                image: levels.at(-1).image,
            }))
            .sort(
                (before, after) =>
                    rank(ranking, before.value) - rank(ranking, after.value),
            ),
    ]),
);

// {node:{low:[image,value],high:[image,value]}}
export const levels = Object.fromEntries(
    Object.entries(nodes).map(([node, levels]) => [
        node,
        {
            low: levels.map(({ range, image }) => ({ value: range[0], image })),
            high: levels.map(({ range, image }) => ({
                value: range[1],
                image,
            })),
        },
    ]),
);
