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
    beam: [53.07, 3.65],
    'ice wall': [14.72, 23.36],
    shuriken: [39.87, 23.36],
    'data leech': [66.1, 23.36],
    protector: [14.54, 43.35],
    blaster: [40.05, 43.35],
    worm: [65.92, 43.35],
    shocker: [28.27, 65.23],
    'battering ram': [52.54, 65.23],
    kraken: [71.99, 65.23],
    maniac: [40.58, 86.43],
    access: [90.9, 36.19],
    wraith: [90.9, 56.99],
    portal: [90.9, 77.79],
};
