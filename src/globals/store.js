import genericReducer from './generic';
import { start } from './generic';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        generic: genericReducer,
    },
});

store.dispatch(start());

export default function DataProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
