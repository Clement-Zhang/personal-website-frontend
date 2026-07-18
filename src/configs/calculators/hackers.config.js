export const settings = [
    {
        name: 'Time Step',
        default: 100,
        min: 100,
        explain:
            'Programs and defending nodes have things happening at different intervals. Keeping in mind your speed with your fingers, set the time step to the fractional greatest common factor of all involved discrete time intervals.',
    },
    {
        name: 'Reaction Time',
        default: 500,
        explain:
            'Time between installing individuals of the same group of programs is assumed to be zero. Usually, what matters more is the time you need to switch from installing one group of programs to another group. I find that both time lengths added together is usually no more than half a second, adjust as per your capabilities.',
    },
];

export const programs = {
    beam: [53.52, 3.65],
    'ice wall': [15.17, 23.36],
    shuriken: [40.32, 23.36],
    'data leech': [66.55, 23.36],
    protector: [14.99, 43.35],
    blaster: [40.5, 43.35],
    worm: [66.37, 43.35],
    shocker: [28.72, 65.23],
    'battering ram': [52.99, 65.23],
    kraken: [72.44, 65.23],
    maniac: [41.03, 86.43],
    access: [91.35, 36.19],
    wraith: [91.35, 56.99],
    portal: [91.35, 77.79],
};
