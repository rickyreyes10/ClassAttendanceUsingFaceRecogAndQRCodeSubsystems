import './ProfessorCreate.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const ProfessorCreate = () => {
    // 1. Setting up the state:
    const [formData, setFormData] = useState({
        courseName: '',
        crn: '',
        email: '',
        password: '',
        studentEmails: [''] //array to store multiple student emails
    });

    const [showPassword, setShowPassword] = useState(false); //State for toggling password visibility

    // 2. Handling user input:
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    //handler for student email change
    const handleStudentEmailChange = (index, value) => {
        const newStudentEmails = [...formData.studentEmails];
        newStudentEmails[index] = value;
        setFormData(prevData => ({
            ...prevData,
            studentEmails: newStudentEmails
        }));
    };

    //handler to add more email fields
    const addEmailField = () => {
        setFormData(prevData => ({
            ...prevData,
            studentEmails: [...prevData.studentEmails, '']
        }));
    };

    //handler to remove email fields
    const removeEmailField = (index) => {
        setFormData(prevData => ({
            ...prevData, //spread operator to copy the previous state
            studentEmails: prevData.studentEmails.filter((_, i) => i !== index) //filter out the email at the given index
            //the underscore is a placeholder for the value at that index
        }));
    };

    const handleSubmit = () => {
        if (!formData.courseName || !formData.crn || !formData.email || !formData.password) {
            toast.error('Please fill in all fields.');
            return;
        }

        // Filter out empty email entries
        const validStudentEmails = formData.studentEmails.filter(email => email.trim() !== '');

        // Create the data to send
        const dataToSend = {
            ...formData,
            studentEmails: validStudentEmails
        };

        // Function to get the CSRF token from cookies
        const getCookie = (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };

        // Get the CSRF token
        const csrftoken = getCookie('csrftoken');


        console.log(formData);
        // Make an API call to the backend with formData
        fetch('http://127.0.0.1:8000/professor/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Include the CSRF token here
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    // Handle the success scenario
                    // For instance, you can display a success notification or redirect to another page
                    toast.success('Class created and details saved successfully!');
                } else if (data.status === "error") {
                    // Handle the error scenario
                    // Display the error message to the user
                    toast.error(data.message);
                }
            })
            .catch(error => {
                // Handle any other network or parsing errors here
                console.error("There was an error processing the request:", error);
            });
    };


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };


    return (
        <motion.div
            className="prof-create-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="prof-create-h1"
                variants={itemVariants}
            >
                Create Class
            </motion.h1>

            <motion.div className="form-container" variants={itemVariants}>
                {/* Course Name */}
                <motion.h2
                    className="prof-create-h2"
                    variants={itemVariants}
                >
                    Course Name
                </motion.h2>
                <motion.div
                    className="prof-create-input-container"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        className="prof-create-input"
                        type="text"
                        placeholder="Enter Course Name..."
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </motion.div>

                {/* CRN */}
                <motion.h2
                    className="prof-create-h2"
                    variants={itemVariants}
                >
                    CRN
                </motion.h2>
                <motion.div
                    className="prof-create-input-container"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        className="prof-create-input"
                        type="text"
                        placeholder="Enter CRN..."
                        name="crn"
                        value={formData.crn}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </motion.div>

                {/* Email */}
                <motion.h2
                    className="prof-create-h2"
                    variants={itemVariants}
                >
                    Email
                </motion.h2>
                <motion.div
                    className="prof-create-input-container"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        className="prof-create-input"
                        type="email"
                        placeholder="Enter Email..."
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </motion.div>

                {/* Student Emails */}
                <motion.h2
                    className="prof-create-h2"
                    variants={itemVariants}
                >
                    Student Emails
                </motion.h2>
                {formData.studentEmails.map((email, index) => (
                    <motion.div
                        key={index}
                        className="prof-create-input-container student-email-container"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            className="prof-create-input"
                            type="email"
                            placeholder="Enter Student Email..."
                            value={email}
                            onChange={(e) => handleStudentEmailChange(index, e.target.value)}
                            autoComplete="off"
                        />
                        {index > 0 && (
                            <motion.button
                                className="remove-email-btn"
                                onClick={() => removeEmailField(index)}
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className="fas fa-times"></i>
                            </motion.button>
                        )}
                    </motion.div>
                ))}

                <motion.button
                    className="add-email-btn"
                    onClick={addEmailField}
                    type="button"
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Student Email
                </motion.button>

                {/* Password */}
                <motion.h2
                    className="prof-create-h2"
                    variants={itemVariants}
                >
                    Password
                </motion.h2>
                <motion.div
                    className="prof-create-input-container"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        className="prof-create-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password..."
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <motion.i
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password-icon`}
                        onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    ></motion.i>
                </motion.div>

                {/* Create Button */}
                <motion.button
                    className="prof-create-btn"
                    onClick={handleSubmit}
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create
                </motion.button>
            </motion.div>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </motion.div>
    );
}

export default ProfessorCreate;