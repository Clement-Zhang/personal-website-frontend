import add from '@/assets/images/calculators/add.jpg';
import remove from '@/assets/images/calculators/remove.jpg';

export default function List({ items, append, remove }) {
    return (
        <div className="flex justify-center">
            {items.map((item, index) => (
                <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_auto]">
                    {item}
                    {append.condition() && (
                        <button
                            className="bg-blue-500 flex items-center"
                            type="button"
                            onClick={append.operation}
                        >
                            <img src={add} alt="append another element" />
                        </button>
                    )}
                    {remove.condition() && (
                        <button
                            className="bg-red-500 flex items-center justify-self-center row-start-2"
                            type="button"
                            onClick={remove.operation}
                        >
                            <img
                                src={remove}
                                alt={'remove element at position ' + index}
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
