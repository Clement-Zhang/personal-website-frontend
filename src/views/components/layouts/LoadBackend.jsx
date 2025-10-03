import { selectGlobal } from '../../../globals/generic';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function LoadBackend({ children }) {
    const global = useSelector(selectGlobal);
    const [dots, setDots] = useState(1);
    useEffect(() => {
        if (global.loading) {
            const interval = setInterval(() => {
                setDots((prev) => (prev % 3) + 1);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [global.loading]);
    return global.loading ? (
        <p className="h-screen justify-center text-2xl">
            Loading{'.'.repeat(dots)}
        </p>
    ) : (
        children
    );
}
