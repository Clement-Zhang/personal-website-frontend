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

for (let node in allNodes) {
    allNodes[node].sort((before, after) => before.value[1] - after.value[0]);
}

export const topLevel = Object.entries(allNodes).reduce(
    (acc, [node, levels]) => {
        acc.push({ value: node, image: levels.at(-1).image });
        return acc;
    },
    [],
);
