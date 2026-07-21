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
                        const element = e.target;
                        const min = Number(element.min);
                        onChange({
                            name: program,
                            value:
                                Math.round((element.value - min) / element.step) *
                                    element.step +
                                min,
                        });
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
