import icon from '../../../assets/images/calculators/hackers/explain.jpg';
import { useState } from 'react';

export default function Settings({ data, onChange }) {
    const [hover, setHover] = useState(null);
    return (
        <form className="flex gap-1">
            {data.map((input) => {
                return (
                    <div key={input.name}>
                        <label htmlFor={input.name} className="flex gap-1">
                            <p>{input.name}</p>
                            <div className="relative">
                                <img
                                    src={icon}
                                    alt="explain"
                                    onMouseEnter={() => setHover(input.name)}
                                    onMouseLeave={() => setHover(null)}
                                    className=""
                                ></img>
                                {hover == input.name && (
                                    <p className="absolute -top-full -left-1/2 bg-white">
                                        test
                                    </p>
                                )}
                            </div>
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
