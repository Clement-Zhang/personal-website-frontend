import { useState } from 'react';

export default function Settings({ data, onChange }) {
    return (
        <form className="flex">
            {data.map((input) => {
                return (
                    <>
                        <label htmlFor={input.name}>{input.name}</label>
                        <input
                            key={input.name}
                            value={input.value}
                            type="number"
                            step="1"
                            min={input.min || 0}
                            onChange={(e) =>
                                onChange({
                                    name: input.name,
                                    value: e.target.value,
                                })
                            }
                            id={input.name}
                        ></input>
                    </>
                );
            })}
        </form>
    );
}
