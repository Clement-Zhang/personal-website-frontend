import ecommerce from '../assets/images/ecommerce.jpg';
import aope from '../assets/images/AoPE.jpg';
import cellGrowthSim from '../assets/images/cellGrowthSim.jpg';
import showcase from '../assets/images/dataAnalyticsShowcase.jpg';

export const projects = [
    // {
    //     name: 'Ecommerce Website',
    //     link: 'https://github.com/Clement-Zhang/ecommerce-system',
    //     img: ecommerce,
    //     alt: 'Screenshot of an online shopping website',
    //     description: "This is a generic e-commerce website that can be extended and customized for specific businesses. Since it is generic, I didn't give it a name. The two product images are identical, that is intentional.",
    // },
    {
        name: 'Attack on Planet Earth',
        link: 'https://github.com/Clement-Zhang/Attack-on-Planet-Earth',
        img: aope,
        alt: 'Screenshot of gameplay of a Space Invaders style game',
        description:
            'Attack on Planet Earth is a remake of Space Invaders, the well known arcade game.',
    },
    {
        name: 'Cell Growth Simulator',
        link: '/sim',
        img: cellGrowthSim,
        alt: 'Screenshot of a cell growth simulation',
        description:
            'This is a simulation of cell growth in a petri dish. The cells divide and cover the dish, and the user can control a number of parameters.',
    },
    {
        name: 'Data Analytics Showcase',
        link: '/showcase',
        img: showcase,
        alt: 'Screenshot of a data analytics dashboard',
        description:
            'This is a showcase of my ability to summarize data in a way that can drive business insights.',
    },
];
