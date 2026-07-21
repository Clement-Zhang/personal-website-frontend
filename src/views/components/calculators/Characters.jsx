export default function Characters({ img, characters, onChange }) {
    return (
        <div className="relative">
            <img src={img.src} className="w-full" alt={img.alt} />
            {Object.keys(characters).map((program) => (
                <input
                    key={program}
                    value={characters[program].value}
                    type="number"
                    step="1"
                    min="0"
                    max={characters[program].max}
                    onChange={(e) =>
                        onChange({
                            name: program,
                            value: e.target.value,
                        })
                    }
                    onBlur={(e) => {
                        const input = e.target;
                        input.value =
                            Math.round((input.value - input.min) / input.step) *
                                input.step +
                            input.min;
                    }}
                    className={
                        'absolute outline-hidden border text-right text-xs! xl:text-base! ' +
                        characters[program].style
                    }
                />
            ))}
        </div>
    );
}
