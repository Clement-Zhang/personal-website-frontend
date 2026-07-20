export default function Characters({ img, characters, inputs, onChange }) {
    return (
        <div className="relative">
            <img src={img.src} className="w-full" alt={img.alt} />
            {Object.keys(inputs).map((program) => (
                <>
                    <input
                        key={program}
                        value={characters[program]}
                        type="number"
                        step="1"
                        min="0"
                        onChange={(e) =>
                            onChange({
                                name: program,
                                value: e.target.value,
                            })
                        }
                        className={
                            'absolute outline-hidden border text-right text-sm! xl:text-base! ' +
                            inputs[program]
                        }
                    />
                </>
            ))}
        </div>
    );
}
