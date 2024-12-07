import './StudentChoosingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentChoosing = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    const buttonVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: i => ({
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: i * 0.2
            }
        }),
        hover: {
            scale: 1.05,
            boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className="Student_ChoosingPage-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="Student_ChoosingPage-h1"
                variants={titleVariants}
            >
                Choose which method you want to use to take attendance for your class
            </motion.h1>

            <motion.div className="buttons-container">
                <Link to="/student-facial-recognition" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.button
                        className="facial_recognition-btn"
                        variants={buttonVariants}
                        custom={0}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Facial Recognition
                    </motion.button>
                </Link>

                <Link to="/student-QR-Code" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.button
                        className="qr_code-btn"
                        variants={buttonVariants}
                        custom={1}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        QR Code
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default StudentChoosing;