import icon from '../../../assets/images/calculators/hackers/options.jpg';
import { createContext, useContext, useState } from 'react';

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
            <div className="*:absolute *:m-4">
                {children}
                <div
                    className={
                        'w-full h-full bg-black rounded-lg m-0 z-50 ' +
                        (!open && 'hidden')
                    }
                >
                    {Options}
                </div>
                <img
                    src={icon}
                    alt="options"
                    className="top-0 right-0 m-4 z-51"
                    onClick={toggleOptions}
                ></img>
            </div>
        </OptionsContext.Provider>
    );
};
