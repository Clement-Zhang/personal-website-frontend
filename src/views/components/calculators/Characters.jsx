export default function Characters({ img, characters, inputs, onChange }) {
    return (
        <div className="relative">
            <img
                src={img.src}
                className="w-full"
                alt={img.alt}
            />
            {Object.keys(inputs).map((program) => (
                <input
                    value={characters[program]}
                    type="number"
                    step="1"
                    min="0"
                    onChange={(e) =>
                        onChange({
                            name: input.name,
                            value: e.target.value,
                        })
                    }
                    style={{
                        left: inputs[program][0] + '%',
                        top: inputs[program][1] + '%',
                    }}
                    className="absolute w-6 outline-hidden text-right"
                />
            ))}
        </div>
    );
}
