import icon from '../../../assets/images/calculators/hackers/explain.jpg';
import { useState, useRef, useEffect } from 'react';

export default function Settings({ data, onChange }) {
    const [tooltip, setTooltip] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({});
    const tooltipRef = useRef(null);
    useEffect(() => {
        if (tooltip) {
            const rect = tooltipRef.current.getBoundingClientRect();
            console.log('tooltip', rect);
            console.log('activeIcon', tooltip.activeIcon);
            let edge = '';
            let align = '';
            let center = [
                tooltip.activeIcon.left + tooltip.activeIcon.width / 2,
                tooltip.activeIcon.top + tooltip.activeIcon.height / 2,
            ];
            if (tooltip.activeIcon.top - rect.height > 0) {
                edge = 'top';
            } else if (
                tooltip.activeIcon.bottom + rect.height <
                window.innerHeight
            ) {
                edge = 'bottom';
            } else if (tooltip.activeIcon.left - rect.width > 0) {
                edge = 'left';
            } else {
                edge = 'right';
            }
            if (edge == 'top' || edge == 'bottom') {
                if (
                    center[0] - rect.width / 2 > 0 &&
                    center[0] + rect.width / 2 < window.innerWidth
                ) {
                    align = 'middle';
                } else if (
                    tooltip.activeIcon.left + rect.width <
                    window.innerWidth
                ) {
                    align = 'left';
                } else {
                    align = 'right';
                }
            } else {
                if (
                    center[1] - rect.height / 2 > 0 &&
                    center[1] + rect.height / 2 < window.innerHeight
                ) {
                    align = 'middle';
                } else if (
                    tooltip.activeIcon.top + rect.height <
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
                    position.bottom =
                        window.innerHeight - tooltip.activeIcon.top;
                    break;
                case 'bottom':
                    position.top = tooltip.activeIcon.bottom;
                    break;
                case 'left':
                    position.right =
                        window.innerWidth - tooltip.activeIcon.left;
                    break;
                case 'right':
                    position.left = tooltip.activeIcon.right;
                    break;
            }
            switch (align) {
                case 'left':
                    position.left = tooltip.activeIcon.left;
                    break;
                case 'right':
                    position.right =
                        window.innerWidth - tooltip.activeIcon.right;
                    break;
                case 'middle':
                    edge == 'top' || edge == 'bottom'
                        ? (position.left = center[0] - rect.width / 2)
                        : (position.top = center[1] - rect.height / 2);
                    break;
            }
            console.log(edge, align);
            setTooltipPosition(position);
        }
    }, [tooltip]);
    let style = {};
    return (
        <form className="flex gap-1">
            {tooltip && (
                <p
                    ref={tooltipRef}
                    className="fixed bg-text-background text-zinc-900 rounded-md max-w-lg"
                    style={tooltipPosition}
                >
                    {tooltip.text}
                </p>
            )}
            {data.map((input) => {
                return (
                    <div key={input.name} className="flex gap-1">
                        <label htmlFor={input.name} className="flex gap-1">
                            <p>{input.name}</p>
                            <img
                                src={icon}
                                alt="explain"
                                onMouseEnter={(e) =>
                                    setTooltip({
                                        text: input.explain,
                                        activeIcon:
                                            e.target.getBoundingClientRect(),
                                    })
                                }
                                onMouseLeave={() => setTooltip(null)}
                            ></img>
                        </label>
                        <input
                            value={input.value}
                            type="number"
                            step="100"
                            min={input.min || 0}
                            onChange={(e) =>
                                onChange({
                                    name: input.name,
                                    value: e.target.value,
                                })
                            }
                            className="w-20 rounded-md outline-none px-1"
                        ></input>
                    </div>
                );
            })}
        </form>
    );
}
