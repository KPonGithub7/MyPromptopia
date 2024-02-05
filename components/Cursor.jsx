"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    transform,
    useVelocity,
    animate,
    useTransform,
} from "framer-motion";

const Cursor = ({ hover }) => {
    // const [isHovered, setIsHovered] = useState(false);
    const cursorSize = hover ? 55 : 23;
    const cursor = useRef(null);
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1),
    };
    const smoothMouse = {
        x: useSpring(mouse.x, { stiffness: 300, damping: 20, mass: 0.5 }),
        y: useSpring(mouse.y, { stiffness: 300, damping: 20, mass: 0.5 }),
    };

    const xvelocity = useVelocity(smoothMouse.x);
    const yvelocity = useVelocity(smoothMouse.y);

    const scaleX = useTransform(xvelocity, [0, 1000], [1, 1.3]);
    const scaleY = useTransform(yvelocity, [0, 1000], [1, 0.8]);

    scale.x.set(scaleX.current);
    scale.y.set(scaleY.current);

    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x);
        const angleDegrees = (angle * 180) / Math.PI;

        animate(
            cursor.current,
            { rotate: `${angleDegrees}deg` },
            { duration: 0 }
        );
    };
    var xprev = 0;
    var yprev = 0;

    const changeMouseMove = (e) => {
        const { clientX, clientY } = e;

        const distance = { x: clientX - xprev, y: clientY - yprev };

        xprev = clientX;
        yprev = clientY;

        rotate(distance);

        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    };

    useEffect(() => {
        window.addEventListener("mousemove", changeMouseMove);
        return () => {
            window.removeEventListener("mousemove", changeMouseMove);
        };
    });
    const template = ({ rotate, scaleX, scaleY }) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
    };
    return (
        <motion.div
            transformTemplate={template}
            ref={cursor}
            className="cursor max-md:hidden"
            style={{
                top: smoothMouse.y,
                left: smoothMouse.x,
                scaleX,
                scaleY,
            }}
            animate={{
                width: cursorSize,
                height: cursorSize,
            }}
        ></motion.div>
    );
};

export default Cursor;
