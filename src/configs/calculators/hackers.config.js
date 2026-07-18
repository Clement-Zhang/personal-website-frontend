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
    beam: [0, 0],
    'ice wall': [0, 0],
    shuriken: [0, 0],
    'data leech': [0, 0],
    protector: [0, 0],
    blaster: [0, 0],
    worm: [0, 0],
    shocker: [0, 0],
    'battering ram': [0, 0],
    kraken: [0, 0],
    maniac: [0, 0],
    access: [0, 0],
    wraith: [0, 0],
    portal: [0, 0],
};
