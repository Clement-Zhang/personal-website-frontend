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
            const position = {
                top: { bottom: window.innerHeight - icon.top - spacing },
                bottom: { top: icon.bottom + spacing },
                left: { right: window.innerWidth - icon.left - spacing },
                right: { left: icon.right + spacing },
            }[edge];
            Object.assign(
                position,
                {
                    left: { left: icon.left },
                    right: { right: window.innerWidth - icon.right },
                    top: { top: icon.top },
                    bottom: { bottom: window.innerHeight - icon.bottom },
                }[align],
            );
            if (align == 'middle') {
                edge == 'top' || edge == 'bottom'
                    ? (position.left = center[0] - rect.width / 2)
                    : (position.top = center[1] - rect.height / 2);
            }
            setTooltipPosition(position);
        }
    }, [spec]);
    return (
        <>
            {spec && (
                <p
                    ref={tooltipRef}
                    className="fixed bg-text-background text-zinc-900 rounded-md max-w-2xs"
                    style={tooltipPosition}
                >
                    {spec.text}
                </p>
            )}
        </>
    );
}
