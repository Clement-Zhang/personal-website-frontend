import tabs from '@/configs/tabs/calculators.config';
import icon from '@/assets/images/calculators/optionsS.jpg';
import { transition } from '@/configs/animations.config';
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
                <motion.nav
                    // layout
                    transition={transition}
                    className={
                        'flex flex-col top-0 bg-gray-700 min-h-screen ' +
                        (extend ? 'w-64' : 'w-12')
                    }
                >
                    <img
                        src={icon}
                        alt="extend sidebar"
                        className="relative w-6 h-6 m-2 left-0 cursor-pointer md:hidden"
                        onClick={toggleExtend}
                    ></img>
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.path}>
                            <div className="grid">
                                <motion.img
                                    src={tab.icon}
                                    // layout
                                    animate={{
                                        opacity: extend ? 1 : 0,
                                    }}
                                    className="col-start-1 row-start-1 w-full"
                                    transition={transition}
                                ></motion.img>
                                <motion.img
                                    src={tab.iconAlt}
                                    // layout
                                    animate={{
                                        opacity: extend ? 0 : 1,
                                    }}
                                    className="col-start-1 row-start-1 w-full"
                                    transition={transition}
                                ></motion.img>
                            </div>
                        </Link>
                    ))}
                </motion.nav>
            }
        </AnimatePresence>
    );
}
