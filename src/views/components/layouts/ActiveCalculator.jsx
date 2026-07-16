import { Outlet } from 'react-router';
import { OptionsProvider } from '../customs/Options';

export default function CalculatorLayout() {
    return (
        <OptionsProvider>
            <Outlet />
        </OptionsProvider>
    );
}
