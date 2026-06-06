import icon from '../../../assets/images/calculators/hackers/options.jpg';
import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptionsContext = createContext();

export const useOptions = () => {
    return useContext(OptionsContext);
};

export const OptionsProvider = ({ children }) => {
    const [Options, setOptions] = useState(null);
    const [open, setOpen] = useState(false);
    function toggleOptions() {
        setOpen((prev) => !prev);
    }
    return (
        <OptionsContext.Provider value={{ setOptions, toggleOptions }}>
            <div className="m-4">{children}</div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: '100vw' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={
                            'absolute top-0 w-full h-full bg-black rounded-3xl p-4 z-49 ' +
                            (!open && 'hidden')
                        }
                    >
                        {Options}
                    </motion.div>
                )}
            </AnimatePresence>
            <img
                src={icon}
                alt="options"
                className="absolute top-0 right-0 m-4 cursor-pointer z-50"
                onClick={toggleOptions}
            ></img>
        </OptionsContext.Provider>
    );
};
