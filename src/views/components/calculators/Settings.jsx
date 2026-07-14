import icon from '../../../assets/images/calculators/hackers/explain.jpg';
import Tooltip from './Tooltip';
import { useState, useRef, useEffect } from 'react';

export default function Settings({ data, onChange }) {
    const [tooltip, setTooltip] = useState(null);
    return (
        <form className="flex gap-1">
            <Tooltip spec={tooltip} />
            {data.map((input) => {
                return (
                    <div key={input.name} className=" *:flex *:gap-1">
                        <label htmlFor={input.name}>
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
