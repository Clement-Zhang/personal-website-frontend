import icon from '@/assets/images/calculators/options_l.jpg';
import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptionsContext = createContext();

export const useOptions = () => {
    return useContext(OptionsContext);
};

export const OptionsProvider = ({ children }) => {
    const [form, setForm] = useState(null);
    const [apply, setApply] = useState(null);
    const [open, setOpen] = useState(false);
    function setOptions(form, apply) {
        setForm(form);
        setApply(() => apply);
    }
    function toggleOptions() {
        setOpen((prev) => !prev);
    }
    return (
        <OptionsContext.Provider value={{ setOptions }}>
            <div className="m-4">{children}</div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: '100vw' }}
                        exit={{ x: '100vw' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={
                            'absolute top-0 max-[426px]:w-screen w-full h-screen overflow-y-auto bg-black rounded-3xl p-4 z-49 flex flex-col items-center'
                        }
                    >
                        {form}
                        <button
                            className="m-4 w-12 bg-text-background text-black rounded-md!"
                            onClick={() => {
                                apply();
                                toggleOptions();
                            }}
                        >
                            Apply
                        </button>
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
