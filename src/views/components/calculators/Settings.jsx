import icon from '../../../assets/images/calculators/hackers/explain.jpg';
import { useState } from 'react';

export default function Settings({ data, onChange }) {
    const [hover, setHover] = useState(null);
    return (
        <form className="flex gap-1">
            {data.map((input) => {
                return (
                    <>
                        <label
                            htmlFor={input.name}
                            className="relative flex gap-1"
                        >
                            <p>{input.name}</p>
                            <img
                                src={icon}
                                alt="explain"
                                onMouseEnter={() => setHover(input.name)}
                                onMouseLeave={() => setHover(null)}
                                className=""
                            ></img>
                            {hover == input.name && (
                                <p className="absolute -top-full">test</p>
                            )}
                        </label>
                        <input
                            key={input.name}
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
                            id={input.name}
                            className="w-20 rounded-md outline-none px-1"
                        ></input>
                    </>
                );
            })}
        </form>
    );
}
