import icon from '../../../assets/images/calculators/hackers/options.jpg';
import { createContext, useContext, useState } from 'react';

const OptionsContext = createContext();

export const useOptions = () => {
    return useContext(OptionsContext);
};

export const OptionsProvider = ({ children }) => {
    const [Options, setOptions] = useState(null);
    const [open, setOpen] = useState(false);
    function setOptions(content) {
        setOptions(content);
    }
    function toggleOptions() {
        setOpen((prev) => !prev);
    }
    return (
        <OptionsContext.Provider value={{ setOptions, toggleOptions }}>
            {children}
            <div className="*:absolute">
                <div
                    className={
                        'w-full h-screen bg-black rounded-lg ' +
                        (open && 'hidden')
                    }
                >
                    {OptionsData}
                </div>
                <img src={icon} alt="options" onClick={toggleOptions}></img>
            </div>
        </OptionsContext.Provider>
    );
};
