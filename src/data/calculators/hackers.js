const AttackerOrder = Object.freeze({
    scanner: 0,
    squid: 1,
    core: 2,
    evolver: 3,
    compiler: 4,
});

const DefenderOrder = Object.freeze({
    bice: 0,
    turret: 1,
    sentry: 2,
});

function rank(ranking, node) {
    return ranking[node] ?? Object.keys(ranking).length;
}

// {node:[{image,range}]}
const allNodes = Object.entries(
    import.meta.glob(
        '@/assets/images/calculators/hackers/gameImgs/nodes/*/*.jpg',
        { eager: true, import: 'default' },
    ),
).reduce((acc, [path, url]) => {
    const segments = path.split('/');
    const node = segments.at(-2);
    (acc[node] ??= []).push({
        image: url,
        range: segments.at(-1).split('.')[0].split('-'),
    });
    return acc;
}, {});

Object.values(allNodes).forEach((levels) => {
    levels.sort(
        (before, after) => Number(before.range[0]) - Number(after.range[0]),
    );
});

// [{value,image}]
export const topLevel = {
    'Attacker Node': Object.entries(allNodes)
        .map(([node, levels]) => ({ value: node, image: levels.at(-1).image }))
        .sort(
            (before, after) =>
                rank(AttackerOrder, before.value) -
                rank(AttackerOrder, after.value),
        ),
    'Defender Nodes': Object.entries(allNodes)
        .map(([node, levels]) => ({ value: node, image: levels.at(-1).image }))
        .sort(
            (before, after) =>
                rank(DefenderOrder, before.value) -
                rank(DefenderOrder, after.value),
        ),
};

// {node:[{image,value}]}
export const lowLevels = Object.fromEntries(
    Object.entries(allNodes).map(([node, levels]) => [
        node,
        levels.map(({ range, image }) => ({ value: range[0], image })),
    ]),
);
