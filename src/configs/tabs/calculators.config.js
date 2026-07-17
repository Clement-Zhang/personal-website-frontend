import hackers from '@/assets/images/calculators/hackers/icon.jpg';
import hackersAlt from '@/assets/images/calculators/hackers/iconAlt.jpg';

function url(endpoint) {
    return '/calculators/' + endpoint;
}

export default [
    {
        path: url('hackers'),
        icon: hackers,
        iconAlt: hackersAlt,
        alt: 'Icon for the Hackers calculator',
    },
];
