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
                            'absolute w-6 outline-hidden border text-right ' +
                            inputs[program]
                        }
                    />
                    <div
                        className={
                            'absolute h-2 w-2 rounded-full bg-red-500 ' +
                            inputs[program]
                        }
                    />
                </>
            ))}
        </div>
    );
}
