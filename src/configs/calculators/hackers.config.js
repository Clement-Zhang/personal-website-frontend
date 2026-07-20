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
    beam: 'left-[53.25%] top-[3.37%] w-[4.01%] h-[2.82%]',
    'ice wall': 'left-[14.72%] top-[23.15%] w-[4.01%] h-[2.82%]',
    shuriken: 'left-[39.87%] top-[23.15%] w-[4.01%] h-[2.82%]',
    'data leech': 'left-[66.1%] top-[23.01%] w-[4.01%] h-[2.82%]',
    protector: 'left-[14.54%] top-[43.14%] w-[4.01%] h-[2.82%]',
    blaster: 'left-[40.05%] top-[43.14%] w-[4.01%] h-[2.82%]',
    worm: 'left-[66.37%] top-[43.28%] w-[4.01%] h-[2.82%]',
    shocker: 'left-[28.27%] top-[65.16%] w-[4.01%] h-[2.82%]',
    'battering ram': 'left-[52.54%] top-[64.95%] w-[4.01%] h-[2.82%]',
    kraken: 'left-[72.17%] top-[64.95%] w-[4.01%] h-[2.82%]',
    maniac: 'left-[40.58%] top-[86.36%] w-[4.01%] h-[2.82%]',
    access: 'left-[90.9%] top-[36.19%] w-[4.01%] h-[2.82%]',
    wraith: 'left-[90.9%] top-[56.99%] w-[4.01%] h-[2.82%]',
    portal: 'left-[90.9%] top-[77.79%] w-[4.01%] h-[2.82%]',
};
