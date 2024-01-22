import { useState, useRef } from "react";
import { motion } from "framer-motion";
const Magnetic = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);
    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { top, left, width, height } =
            ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX / 5, y: middleY / 5 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            className="relative"
            onMouseMove={handleMouse}
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
            animate={{ x, y }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 5,
                mass: 0.5,
            }}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
