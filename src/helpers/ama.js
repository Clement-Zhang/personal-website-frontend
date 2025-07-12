function addMarkdown(block) {
    return {
        ...block,
        renderMarkdown: ['BOT', 'USER'],
    };
}
function replaceBlock(message, setFlow) {
    setFlow((prev) => {
        const block = addMarkdown({
            message: message,
            path: 'sync',
        });
        if (prev.filler) {
            const { filler, ...next } = prev;
            return {
                ...next,
                interact: block,
            };
        } else {
            return {
                ...prev,
                filler: {},
                interact: block,
            };
        }
    });
}
async function submit(e, setChange, setFlow) {
    const res = await fetch('/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: e.data.inputText }),
    });
    const result = await res.json();
    const response = result.response;
    if (response === 'fail') {
        replaceBlock(
            'You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.',
            setFlow
        );
    } else {
        const res = await fetch('/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile: response }),
        });
        const result = await res.json();
        const profiles = result.matches;
        console.log('Received profiles:', profiles);
        replaceBlock(JSON.stringify(profiles, null, '\t'), setFlow);
    }
    setChange((prev) => (prev === null ? true : !prev));
}
async function reset(setChange, setFlow) {
    await fetch('/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    replaceBlock('Chatbot has been reset.', setFlow);
    setChange((prev) => (prev === null ? true : !prev));
}
function grow(e) {
    const elem = document.querySelector('.rcb-chat-input-textarea');
    elem.style.height = 'auto';
    const scrollHeight = elem.scrollHeight;
    if (scrollHeight > 200) {
        elem.style.height = '200px';
    } else {
        elem.style.height = scrollHeight + 'px';
    }
}

export { addMarkdown, replaceBlock, submit, reset, grow };
