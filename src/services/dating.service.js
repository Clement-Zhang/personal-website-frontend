import socket from '../globals/socket';

export async function submit(text) {
    const response = await socket.emitWithAck('reformat', text);
    if (response.includes('fail')) {
        return 'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.';
    } else {
        const match = await socket.emitWithAck('match', response);
        return JSON.stringify(match, null, '\t');
    }
}

export async function reset() {
    await fetch(process.env.REACT_APP_DATING_BACKEND_HTTP + '/reset', {
        method: 'POST',
    });
}
