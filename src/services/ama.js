async function submit(text) {
    const res = await fetch(process.env.REACT_APP_BACKEND + '/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
    });
    const result = await res.json();
    const response = result.response;
    if (response.includes('fail')) {
        return 'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.';
    } else {
        const res = await fetch(process.env.REACT_APP_BACKEND + '/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile: response }),
        });
        const result = await res.json();
        const profiles = result.matches;
        return JSON.stringify(profiles, null, '\t');
    }
}
async function reset() {
    await fetch(process.env.REACT_APP_BACKEND + '/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
}

export { submit, reset };
