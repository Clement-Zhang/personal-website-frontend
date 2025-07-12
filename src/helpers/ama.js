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

export { addMarkdown, grow };
