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
    beam: [52.17, 3.65],
    'ice wall': [13.82, 23.36],
    shuriken: [38.97, 23.36],
    'data leech': [65.2, 23.36],
    protector: [13.64, 43.35],
    blaster: [39.15, 43.35],
    worm: [65.02, 43.35],
    shocker: [27.37, 65.23],
    'battering ram': [51.64, 65.23],
    kraken: [71.09, 65.23],
    maniac: [39.68, 86.43],
    access: [90, 36.19],
    wraith: [90, 56.99],
    portal: [90, 77.79],
};
