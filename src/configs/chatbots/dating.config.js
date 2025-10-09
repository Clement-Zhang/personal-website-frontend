import { reset, reformat, match } from '../../services/dating.service';

export const defaults = {
    text: '',
};

export const dating = {
    inputs: { text: 'Enter your profile' },
    reset: async () => await reset(),
    submit: [
        { type: 'proc', func: (prompt) => reformat(prompt) },
        { type: 'stream', event: 'reformat.res' },
        { type: 'func', func: async (text) => await match(text) },
    ],
};
