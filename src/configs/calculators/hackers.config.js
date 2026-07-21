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

settings.forEach((setting) => {
    setting.value = setting.default;
    delete setting.default;
});

export const programs = {
    beam: 'left-[53.43%] top-[3.37%] w-[4.41%] h-[2.82%]',
    'ice wall': 'left-[14.97%] top-[23.15%] w-[4.41%] h-[2.82%]',
    shuriken: 'left-[40.14%] top-[23.15%] w-[4.41%] h-[2.82%]',
    'data leech': 'left-[66.3%] top-[23.14%] w-[4.32%] h-[2.69%]',
    protector: 'left-[14.81%] top-[43.27%] w-[4.41%] h-[2.82%]',
    blaster: 'left-[40.3%] top-[43.27%] w-[4.41%] h-[2.82%]',
    worm: 'left-[66.37%] top-[43.41%] w-[4.41%] h-[2.82%]',
    shocker: 'left-[28.52%] top-[65.16%] w-[4.41%] h-[2.82%]',
    'battering ram': 'left-[52.81%] top-[64.95%] w-[4.41%] h-[2.82%]',
    kraken: 'left-[72.35%] top-[64.95%] w-[4.41%] h-[2.69%]',
    maniac: 'left-[40.76%] top-[86.36%] w-[4.41%] h-[2.82%]',
    access: 'left-[91.01%] top-[36.19%] w-[4.41%] h-[2.69%]',
    wraith: 'left-[90.9%] top-[56.99%] w-[4.41%] h-[2.69%]',
    portal: 'left-[90.9%] top-[77.79%] w-[4.41%] h-[2.82%]',
};

for (let program in programs) {
    programs[program] = { style: programs[program], value: 0, max: 21 };
}
