import { reset, submit } from '../../services/dating.service';

export const dating = {
    text: 'Enter your profile',
    reset: async () => await reset(),
    submit: async (prompt) => await submit(prompt),
};
