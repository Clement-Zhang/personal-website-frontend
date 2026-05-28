import hackers from '../assets/images/calculators/hackers/icon.jpg';

function url(endpoint) {
    return '/calculators/' + endpoint;
}

export default [
    {
        path: url('hackers'),
        icon: hackers,
        alt: 'Icon for the Hackers calculator',
    },
];
