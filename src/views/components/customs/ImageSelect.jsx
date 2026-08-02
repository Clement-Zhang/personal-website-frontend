import arrow from '@/assets/images/calculators/down.jpg';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        options.find((option) => option.value == value),
    );
    return (
        <div className="relative *:w-12" onBlur={() => setOpen(false)}>
            <div
                className="flex items-center border-y border-be cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <img
                    src={selected.image}
                    alt={selected.value}
                />
                <img src={arrow} alt="down arrow" className="size-3" />
            </div>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="absolute top-full list-none ps-0 origin-top **:my-px"
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
