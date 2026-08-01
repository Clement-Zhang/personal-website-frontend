import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        options.find((option) => option.value == value),
    );
    return (
        <div className="relative **:w-12" onBlur={() => setOpen(false)}>
            <img
                src={selected.image}
                alt={selected.value}
                className="cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            />
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute top-full list-none ps-0 origin-top"
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
                                <img src={option.image} alt={option.value} />
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
