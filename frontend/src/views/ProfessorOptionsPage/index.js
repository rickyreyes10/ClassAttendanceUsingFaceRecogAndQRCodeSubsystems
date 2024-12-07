import './ProfessorOptionsPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfessorOptions = () => {

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
            className="prof-options-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="prof-options-h1"
                variants={titleVariants}
            >
                Professor Options
            </motion.h1>

            <motion.h2
                className="prof-options-h2"
                variants={titleVariants}
            >
                Select an option
            </motion.h2>

            <motion.div className="buttons-container">
                <Link to="/professor-login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.button
                        className="loginOption-btn"
                        variants={buttonVariants}
                        custom={0}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Login
                    </motion.button>
                </Link>

                <Link to="/professor-create" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.button
                        className="createOption-btn"
                        variants={buttonVariants}
                        custom={1}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Create
                    </motion.button>
                </Link>

                <Link to="/professor-delete" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.button
                        className="deleteOption-btn"
                        variants={buttonVariants}
                        custom={2}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Delete
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};


export default ProfessorOptions;