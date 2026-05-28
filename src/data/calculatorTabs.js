import hackers from '../assets/images/calculators/hackers/icon.png';

function url(endpoint) {
    return '/calculators/' + endpoint;
}

export const tabs = [
    {
        path: url('hackers'),
        icon: hackers,
        alt: 'Icon for the Hackers calculator',
    },
];
