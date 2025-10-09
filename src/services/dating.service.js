import { request } from './socket.service.js';

export const reformat = (text) =>
    request('reformat', { type: 'req', prompt: text });

export async function match(text) {
    if (text.includes('fail')) {
        return 'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.';
    } else {
        const match = await request('match', text);
        return JSON.stringify(match, null, '\t');
    }
}

export const reset = async () =>
    await fetch(process.env.REACT_APP_DATING_BACKEND_HTTP + '/reset', {
        method: 'POST',
    });
