export const nodes = Object.entries(
    import.meta.glob(
        '../../assets/images/calculators/hackers/gameImgs/nodes/*/face.jpg',
        { eager: true, import: 'default' },
    ),
).reduce((acc, [path, url]) => {
    acc.push({ image: url, value: path.split('/').at(-2) });
    return acc;
}, []);
