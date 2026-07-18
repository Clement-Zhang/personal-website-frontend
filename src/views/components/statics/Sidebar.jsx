import tabs from '@/configs/tabs/calculators.config';
import icon from '@/assets/images/calculators/optionsS.jpg';
import transition from '@/configs/animations.config';
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
                    animate={{ width: extend ? 256 : 48 }}
                    transition={transition}
                    className={
                        'flex flex-col top-0 bg-gray-700 min-h-screen ' +
                        (extend ? 'w-64' : 'w-12')
                    }
                >
                    <motion.img
                        src={icon}
                        alt="extend sidebar"
                        transition={transition}
                        animate={{
                            'align-self': extend ? 'flex-start' : 'center',
                        }}
                        className={
                            'relative w-6 h-6 m-2 cursor-pointer md:hidden'
                        }
                        onClick={toggleExtend}
                    ></motion.img>
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.path}>
                            <div className="relative">
                                <motion.img
                                    src={tab.icon}
                                    animate={{
                                        opacity: extend ? 1 : 0,
                                        width: extend ? 256 : 48,
                                    }}
                                    className="absolute h-12"
                                    transition={transition}
                                ></motion.img>
                                <motion.img
                                    src={tab.iconAlt}
                                    animate={{
                                        opacity: extend ? 0 : 1,
                                        width: extend ? 256 : 48,
                                    }}
                                    className="absolute h-12"
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
