import tabs from '@/configs/tabs/calculators.config';
import icon from '@/assets/images/calculators/options_s.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    function toggleSidebar() {
        setOpen((prev) => !prev);
    }
    return (
        <>
            <div className="md:hidden flex">
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: '-100%' }}
                            exit={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <nav className="flex flex-col top-0 bg-gray-700 w-64 min-h-screen">
                                {tabs.map((tab) => (
                                    <Link to={tab.path} key={tab.path}>
                                        <img src={tab.icon}></img>
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
                <img
                    src={icon}
                    alt="sidebar"
                    className="m-4 z-50"
                    onClick={toggleSidebar}
                ></img>
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
