import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const HomePage = () => {
    // State to track if the menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to track if the content is visible or hidden
    const [isVisible, setIsVisible] = useState(false);

    // Use effect to set the isVisible state to true after 1 second
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // variants are used to animate the container when it is visible or hidden
    const containerVariants = { // The variants for the container
        hidden: { opacity: 0 }, // The hidden state of the container is opacity 0
        visible: {
            opacity: 1, // The visible state of the container is opacity 1
            transition: { duration: 1 } // The transition for the container is a duration of 1 second
        }
    };

    // Variants for the title which will animate when the content is visible
    const titleVariants = {
        hidden: { y: -50, opacity: 0 }, // The hidden state of the title is y -50 and opacity 0
        visible: {
            y: 0, // The visible state of the title is y 0
            opacity: 1, // The visible state of the title is opacity 1
            transition: {
                type: "spring", // The transition for the title is a spring.. spring is a type of animation which has a effect of bouncing
                stiffness: 100, // The stiffness of the spring which determines how much the spring will bounce
                delay: 0.5 // The delay of the animation
            }
        }
    };

    // Variants for the buttons which will animate when the content is visible
    const buttonVariants = { // The variants for the buttons
        hover: {
            scale: 1.05, // The scale of the button when hovered over   
            boxShadow: "0px 0px 8px rgb(255,255,255)", // The box shadow of the button when hovered over
            transition: { type: "spring", stiffness: 400 } // The transition for the button is a spring with a stiffness of 400
        },
        tap: { scale: 0.95 } // The scale of the button when tapped
    };

    return ( // The main container for the home page
        <motion.div // The container for the home page
            className="home-page-container"
            initial="hidden" // The initial state of the container is hidden
            animate={isVisible ? "visible" : "hidden"} // The animate state of the container is visible if isVisible is true, otherwise it is hidden
            variants={containerVariants} // The variants for the container are defined in the containerVariants object
        >
            <motion.div // The menu icon
                className="menu-icon"
                whileHover={{ scale: 1.1 }} // The menu icon scales up when hovered over
                whileTap={{ scale: 0.9 }} // The menu icon scales down when tapped
            >
                <GiHamburgerMenu // The menu icon
                    size={35} // The size of the menu icon
                    color="black" // The color of the menu icon
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // The function to toggle the menu open state when the menu icon is clicked
                />
            </motion.div>

            {isMenuOpen && ( // The menu is visible if the isMenuOpen state is true
                <motion.div // The menu container
                    className="menu" // The class name of the menu container
                    initial={{ opacity: 0, x: 100 }} // The initial state of the menu container is opacity 0 and x 100
                    animate={{ opacity: 1, x: 0 }} // The animate state of the menu container is opacity 1 and x 0
                    exit={{ opacity: 0, x: 100 }} // The exit state of the menu container is opacity 0 and x 100
                    transition={{ type: "spring", stiffness: 100 }} // The transition for the menu container is a spring with a stiffness of 100
                >
                    <ul>
                        <motion.div whileHover={{ x: 10 }}> {/* The motion.div for the about link */}
                            <Link to="/about" onClick={() => setIsMenuOpen(false)}> {/* The link to the about page */}
                                <li>About</li> {/* The text of the about link */}
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ x: 10 }}> {/* The motion.div for the how to use link */}
                            <Link to="/how-to-use" onClick={() => setIsMenuOpen(false)}> {/* The link to the how to use page */}
                                <li>How to use</li> {/* The text of the how to use link */}
                            </Link>
                        </motion.div>
                    </ul>
                </motion.div>
            )}

            <motion.h1 // The title of the home page
                className="home-page-h1" // The class name of the title
                variants={titleVariants} // The variants for the title are defined in the titleVariants object
            >
                Class Attendance System
            </motion.h1>

            <motion.p
                className="home-page-intro" // The class name of the introduction
                initial={{ opacity: 0 }} // The initial state of the introduction is opacity 0
                animate={{ opacity: 1 }} // The animate state of the introduction is opacity 1
                transition={{ delay: 1, duration: 1 }} // The transition for the introduction is a delay of 1 second and a duration of 1 second
            >
                Welcome to the Class Attendance System! My platform utilizes
                facial recognition and QR code technology to simplify attendance tracking for students.
            </motion.p>

            <motion.div // The container for the professor button
                initial={{ opacity: 0, y: 50 }} // The initial state of the container is opacity 0 and y 50
                animate={{ opacity: 1, y: 0 }} // The animate state of the container is opacity 1 and y 0
                transition={{ delay: 1.5, duration: 0.5 }} // The transition for the container is a delay of 1.5 seconds and a duration of 0.5 seconds
            >
                <Link to="/professor-options" style={{ textDecoration: 'none', color: 'inherit' }}> {/* The link to the professor options page */}
                    <motion.button // The professor button
                        className="professor-btn" // The class name of the professor button
                        variants={buttonVariants} // The variants for the professor button are defined in the buttonVariants object
                        whileHover="hover" // The professor button scales up when hovered over
                        whileTap="tap" // The professor button scales down when tapped
                    >
                        Professor
                    </motion.button>
                </Link>

                <Link to="/student-choosing-method" style={{ textDecoration: 'none', color: 'inherit' }}> {/* The link to the student choosing method page */}
                    <motion.button // The student button
                        className="student-btn" // The class name of the student button
                        variants={buttonVariants} // The variants for the student button are defined in the buttonVariants object
                        whileHover="hover" // The student button scales up when hovered over
                        whileTap="tap" // The student button scales down when tapped
                    >
                        Student
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default HomePage;