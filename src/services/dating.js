async function submit(text) {
    const res = await fetch(process.env.REACT_APP_BACKEND + '/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text,
    });
    const response = await res.text();
    if (response.includes('fail')) {
        return 'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.';
    } else {
        const res = await fetch(process.env.REACT_APP_BACKEND + '/match', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: response,
        });
        const profiles = await res.json();
        return JSON.stringify(profiles, null, '\t');
    }
}
async function reset() {
    await fetch(process.env.REACT_APP_BACKEND + '/reset', {
        method: 'POST',
    });
}

export { submit, reset };
