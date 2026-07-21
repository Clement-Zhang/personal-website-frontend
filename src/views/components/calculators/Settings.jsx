import icon from '@/assets/images/calculators/hackers/explain.jpg';
import Tooltip from './Tooltip';
import { useState } from 'react';

export default function Settings({ settings, onChange }) {
    const [tooltip, setTooltip] = useState(null);
    return (
        <div className="flex flex-col xl:flex-row gap-1 **:flex! **:gap-1!">
            <Tooltip spec={tooltip} />
            {settings.map((input) => (
                <div key={input.name}>
                    <label htmlFor={input.name}>
                        <p className="shrink-0">{input.name}</p>
                        <img
                            src={icon}
                            alt="explain"
                            className="h-6 w-6 shrink-0"
                            onMouseEnter={(e) =>
                                setTooltip({
                                    text: input.explain,
                                    activeIcon:
                                        e.target.getBoundingClientRect(),
                                })
                            }
                            onMouseLeave={() => setTooltip(null)}
                        />
                    </label>
                    <input
                        value={input.value}
                        type="number"
                        step="100"
                        min={input.min || 0}
                        onChange={(e) => {
                            onChange({
                                name: input.name,
                                value: e.target.value,
                            });
                            console.log(settings);
                        }}
                        onBlur={(e) => {
                            const input = e.target;
                            input.value =
                                Math.round(
                                    (input.value - input.min) / input.step,
                                ) *
                                    input.step +
                                input.min;
                            console.log(settings);
                        }}
                        className="w-20 h-6 rounded-md outline-hidden bg-text-background px-1"
                    />
                </div>
            ))}
        </div>
    );
}
