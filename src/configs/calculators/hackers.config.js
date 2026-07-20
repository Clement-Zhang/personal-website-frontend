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
    beam: 'left-[53.07%] top-[3.3%]',
    'ice wall': 'left-[14.72%] top-[23.08%]',
    shuriken: 'left-[39.87%] top-[23.08%]',
    'data leech': 'left-[66.1%] top-[22.94%]',
    protector: 'left-[14.54%] top-[43.07%]',
    blaster: 'left-[40.05%] top-[43.07%]',
    worm: 'left-[65.92%] top-[43.21%]',
    shocker: 'left-[28.27%] top-[65.09%]',
    'battering ram': 'left-[52.54%] top-[64.81%]',
    kraken: 'left-[71.99%] top-[64.81%]',
    maniac: 'left-[40.58%] top-[86.29%]',
    access: 'left-[90.9%] top-[36.19%]',
    wraith: 'left-[90.9%] top-[56.99%]',
    portal: 'left-[90.9%] top-[77.79%]',
};
