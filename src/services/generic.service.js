export const wake = async () =>
    await fetch(import.meta.env.VITE_GENERIC_BACKEND + '/wake', {
        method: 'GET',
    });
