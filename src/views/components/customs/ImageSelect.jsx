import arrow from '@/assets/images/calculators/down.jpg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSelect({ value, onChange, options, width="w-12" }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        options.find((option) => option.value == value),
    );
    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center border-y border-e cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
                onBlur={() => setOpen(false)}
            >
                <img
                    src={selected.image}
                    alt={selected.value + ' selected'}
                    className={width}
                />
                <img src={arrow} alt="dropdown" className="size-3" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute top-full list-none ps-0 origin-top **:my-px max-h-50 overflow-auto"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="cursor-pointer"
                                onClick={() => {
                                    onChange(option.value);
                                    setSelected(option);
                                    setOpen(false);
                                }}
                            >
                                <img src={option.image} alt={option.value} className={width}/>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
