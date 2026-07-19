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
    beam: 'left-[52.17%] top-[3.3%]',
    'ice wall': 'left-[13.82%] top-[23.08%]',
    shuriken: 'left-[38.97%] top-[23.08%]',
    'data leech': 'left-[65.2%] top-[22.94%]',
    protector: 'left-[13.64%] top-[43.07%]',
    blaster: 'left-[39.15%] top-[43.07%]',
    worm: 'left-[65.02%] top-[43.21%]',
    shocker: 'left-[27.37%] top-[65.09%]',
    'battering ram': 'left-[51.64%] top-[65.09%]',
    kraken: 'left-[71.09%] top-[65.09%]',
    maniac: 'left-[39.68%] top-[86.43%]',
    access: 'left-[90%] top-[36.19%]',
    wraith: 'left-[90%] top-[56.99%]',
    portal: 'left-[90%] top-[77.79%]',
};
