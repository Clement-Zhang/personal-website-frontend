import genericReducer from './generic';
import { start } from './generic';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

const store = configureStore({
    reducer: {
        generic: genericReducer,
    },
});

export default function DataProvider({ children }) {
    useEffect(() => {
        store.dispatch(start());
    }, []);
    return <Provider store={store}>{children}</Provider>;
}
