import appendIcon from '@/assets/images/calculators/add.jpg';
import removeIcon from '@/assets/images/calculators/remove.jpg';

export default function List({ items, append, remove }) {
    return (
        <div className="flex justify-center">
            {items.map((item, index) => (
                <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_auto]">
                    {item}
                    {append.condition() && item == items.at(-1) && (
                        <button
                            className="bg-blue-500 flex items-center"
                            type="button"
                            onClick={() => append.operation()}
                        >
                            <img
                                src={appendIcon}
                                alt="append another element"
                            />
                        </button>
                    )}
                    {remove.condition() && items.length > 1 && (
                        <button
                            className="bg-red-500 flex items-center justify-self-center row-start-2"
                            type="button"
                            onClick={() => remove.operation(index)}
                        >
                            <img
                                src={removeIcon}
                                alt={'remove element at position ' + index}
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
