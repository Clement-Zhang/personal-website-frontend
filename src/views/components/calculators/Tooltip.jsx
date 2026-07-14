import { useState, useRef, useEffect } from 'react';

export default function Tooltip({ spec }) {
    const [tooltipPosition, setTooltipPosition] = useState({});
    const tooltipRef = useRef(null);
    useEffect(() => {
        if (spec) {
            const rect = tooltipRef.current.getBoundingClientRect();
            const icon = spec.activeIcon;
            let edge = '';
            let align = '';
            let center = [
                icon.left + icon.width / 2,
                icon.top + icon.height / 2,
            ];
            let spacing = 3;
            if (icon.top - rect.height - spacing > 0) {
                edge = 'top';
            } else if (
                icon.bottom + rect.height + spacing <
                window.innerHeight
            ) {
                edge = 'bottom';
            } else if (icon.left - rect.width - spacing > 0) {
                edge = 'left';
            } else {
                edge = 'right';
            }
            if (edge == 'top' || edge == 'bottom') {
                if (
                    center[0] - rect.width / 2 - spacing > 0 &&
                    center[0] + rect.width / 2 + spacing < window.innerWidth
                ) {
                    align = 'middle';
                } else if (
                    icon.left + rect.width + spacing <
                    window.innerWidth
                ) {
                    align = 'left';
                } else {
                    align = 'right';
                }
            } else {
                if (
                    center[1] - rect.height / 2 - spacing > 0 &&
                    center[1] + rect.height / 2 + spacing < window.innerHeight
                ) {
                    align = 'middle';
                } else if (
                    icon.top + rect.height + spacing <
                    window.innerHeight
                ) {
                    align = 'top';
                } else {
                    align = 'bottom';
                }
            }
            let position = {};
            switch (edge) {
                case 'top':
                    position.bottom = window.innerHeight - icon.top - spacing;
                    break;
                case 'bottom':
                    position.top = icon.bottom + spacing;
                    break;
                case 'left':
                    position.right = window.innerWidth - icon.left - spacing;
                    break;
                case 'right':
                    position.left = icon.right + spacing;
                    break;
            }
            switch (align) {
                case 'left':
                    position.left = icon.left;
                    break;
                case 'right':
                    position.right = window.innerWidth - icon.right;
                    break;
                case 'middle':
                    edge == 'top' || edge == 'bottom'
                        ? (position.left = center[0] - rect.width / 2)
                        : (position.top = center[1] - rect.height / 2);
                    break;
            }
            setTooltipPosition(position);
        }
    }, [spec]);
    return (
        <>
            {spec && (
                <p
                    ref={tooltipRef}
                    className="fixed bg-text-background text-zinc-900 rounded-md max-w-lg"
                    style={tooltipPosition}
                >
                    {spec.text}
                </p>
            )}
        </>
    );
}
