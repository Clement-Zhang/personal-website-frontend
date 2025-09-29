import socket from '../globals/socket';

async function submit(text) {
    const response = socket.emit('reformat', text, (_, response) => response);
    console.log(response);
    if (response.includes('fail')) {
        return 'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.';
    } else {
        const match = socket.emit('match', response, (_, response) => response);
        return JSON.stringify(match, null, '\t');
    }
}
async function reset() {
    await fetch(process.env.REACT_APP_BACKEND + '/reset', {
        method: 'POST',
    });
}

export { submit, reset };
