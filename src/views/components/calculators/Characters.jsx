import CorrectingInput from '../customs/CorrectingInput';

export default function Characters({ img, characters, onChange }) {
    return (
        <div className="relative">
            <img src={img.src} className="w-full" alt={img.alt} />
            {Object.keys(characters).map((program) => (
                <CorrectingInput
                    key={program}
                    item={characters[program]}
                    onChange={onChange}
                    styles={
                        'absolute outline-hidden border text-right text-xs! xl:text-base! ' +
                        characters[program].style
                    }
                />
            ))}
        </div>
    );
}
