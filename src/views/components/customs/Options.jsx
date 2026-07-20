import icon from '@/assets/images/calculators/optionsL.jpg';
import { transition } from '@/configs/animations.config';
import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptionsContext = createContext();

export const useOptions = () => {
    return useContext(OptionsContext);
};

export const OptionsProvider = ({ children }) => {
    const [form, setForm] = useState(null);
    const [submit, setSubmit] = useState(null);
    const [open, setOpen] = useState(false);
    function setOptions(form, submit) {
        setForm(form);
        setSubmit(() => submit);
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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 w-full h-screen overflow-y-auto bg-black rounded-3xl p-4 z-49"
                    >
                        {form}
                    </motion.div>
                )}
            </AnimatePresence>
            <img
                src={icon}
                alt="options"
                className="absolute top-0 right-0 m-4 cursor-pointer z-50"
                onClick={() => {
                    open && submit();
                    toggleOptions();
                }}
            ></img>
        </OptionsContext.Provider>
    );
};
