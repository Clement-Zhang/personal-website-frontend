import tabs from '@/configs/tabs/calculators.config';
import icon from '@/assets/images/calculators/optionsS.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const [extend, setExtend] = useState(false);
    function toggleExtend() {
        setExtend((prev) => !prev);
    }
    return (
        <>
            <div className="md:hidden">
                <nav className="flex flex-col top-0 bg-gray-700 w-12 min-h-screen">
                    <img
                        src={icon}
                        alt="extend sidebar"
                        className="relative w-6 h-6 m-2 cursor-pointer"
                        onClick={toggleExtend}
                    ></img>
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.path}>
                            <img src={tab.iconAlt}></img>
                        </Link>
                    ))}
                </nav>
                {/* <AnimatePresence>
                    {extend && (
                        <motion.div transition={{ duration: 0.3 }}>
                        </motion.div>
                    )}
                </AnimatePresence> */}
            </div>
            <nav className="hidden md:flex flex-col top-0 bg-gray-700 w-64 min-h-screen">
                {tabs.map((tab) => (
                    <Link to={tab.path} key={tab.path}>
                        <img src={tab.icon}></img>
                    </Link>
                ))}
            </nav>
        </>
    );
}
