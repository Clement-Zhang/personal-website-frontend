import tabs from '@/configs/tabs/calculators.config';
import icon from '@/assets/images/calculators/optionsS.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const [extend, setExtend] = useState(window.innerWidth >= 768);
    function toggleExtend() {
        setExtend((prev) => !prev);
    }
    return (
        <AnimatePresence>
            {
                <motion.div
                    animate={{ width: extend ? 256 : 48 }}
                    transition={{ duration: 0.3 }}
                >
                    <nav className="flex flex-col top-0 bg-gray-700 w-12 md:w-64 min-h-screen items-center">
                        <img
                            src={icon}
                            alt="extend sidebar"
                            className="relative w-6 h-6 m-2 cursor-pointer md:hidden"
                            onClick={toggleExtend}
                        ></img>
                        {tabs.map((tab) => (
                            <Link to={tab.path} key={tab.path}>
                                <img
                                    src={extend ? tab.icon : tab.iconAlt}
                                ></img>
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            }
        </AnimatePresence>
    );
}
