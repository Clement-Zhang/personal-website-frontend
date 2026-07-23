import icon from '@/assets/images/calculators/hackers/explain.jpg';
import Tooltip from './Tooltip';
import CorrectingInput from '../customs/CorrectingInput';
import { useState } from 'react';

export default function Settings({ settings, onChange }) {
    const [tooltip, setTooltip] = useState(null);
    return (
        <div className="flex flex-col xl:flex-row gap-1 **:flex! **:gap-1!">
            <Tooltip spec={tooltip} />
            {settings.map((setting) => (
                <div key={setting.name}>
                    <label htmlFor={setting.name}>
                        <p className="shrink-0">{setting.name}</p>
                        <img
                            src={icon}
                            alt="explain"
                            className="h-6 w-6 shrink-0"
                            onMouseEnter={(e) =>
                                setTooltip({
                                    text: setting.explain,
                                    activeIcon:
                                        e.target.getBoundingClientRect(),
                                })
                            }
                            onMouseLeave={() => setTooltip(null)}
                        />
                    </label>
                    <CorrectingInput
                        name={setting.name}
                        item={setting}
                        onChange={onChange}
                        styles="w-20 h-6 rounded-md outline-hidden bg-text-background px-1"
                    />
                </div>
            ))}
        </div>
    );
}
