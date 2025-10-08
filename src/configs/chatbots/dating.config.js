import { reset, reformat, match } from '../../services/dating.service';

export const dating = {
    text: 'Enter your profile',
    reset: async () => await reset(),
    submit: [
        { type: 'proc', func: (prompt) => reformat(prompt) },
        { type: 'wait', event: 'reformat/res' },
        { type: 'func', func: async (text) => await match(text) },
    ],
};
