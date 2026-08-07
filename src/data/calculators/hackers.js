const Order = Object.freeze({
    scanner: 0,
    squid: 1,
    core: 2,
    evolver: 3,
    compiler: 4,
});

function rank(node) {
    return Order[node] ?? 5;
}

const allNodes = Object.entries(
    import.meta.glob(
        '../../assets/images/calculators/hackers/gameImgs/nodes/*/*.jpg',
        { eager: true, import: 'default' },
    ),
).reduce((acc, [path, url]) => {
    const node = path.split('/').at(-2);
    acc[node]
        ? acc[node].push({
              image: url,
              value: path.split('/').at(-1).slice(0, -4).split('-'),
          })
        : (acc[node] = [
              {
                  image: url,
                  value: path.split('/').at(-1).slice(0, -4).split('-'),
              },
          ]);
    return acc;
}, {});

Object.values(allNodes).forEach((levels) => {
    levels.sort((before, after) => before.value[1] - after.value[0]);
});

export const topLevel = Object.entries(allNodes)
    .reduce((acc, [node, levels]) => {
        acc.push({ value: node, image: levels.at(-1).image });
        return acc;
    }, [])
    .sort((before, after) => {
        console.log(before.value, after.value);
        console.log(rank(before.value), rank(after.value));
        return rank(before.value) - rank(after.value);
    });
