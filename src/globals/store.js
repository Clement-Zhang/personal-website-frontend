import technicalsReducer from './technicals';
import { start } from './technicals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        technicals: technicalsReducer,
    },
});

store.dispatch(start());

export default function DataProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
