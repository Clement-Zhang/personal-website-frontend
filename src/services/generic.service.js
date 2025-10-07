export const wake = async () =>
    await fetch(process.env.REACT_APP_GENERIC_BACKEND + '/wake', {
        method: 'GET',
    });
