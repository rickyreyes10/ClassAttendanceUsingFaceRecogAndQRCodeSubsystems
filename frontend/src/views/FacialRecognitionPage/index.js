import './FacialRecognitionPage.css';
import Modal from 'react-modal';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

Modal.setAppElement('#root'); //supresses modal-related console warnings.

const FacialRecognitionPage = () => {
  const [crn, setCrn] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const videoRef = useRef(null);
  useEffect(() => {
    let stream = null;

    // This function initializes the webcam stream.
    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      } catch (err) {
        console.error("error:", err);
      }
    };

    getVideo();

    // Cleanup function
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [videoRef]);



  // Function to capture image data from the webcam
  const captureImageData = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg');
    });
  };


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


  const handleLoginSubmit = async () => {
    const imageData = await captureImageData();
    // Create a FormData object to send the CRN and image data
    const formData = new FormData();
    formData.append('crn', crn);
    formData.append('image', imageData);
    // Append the CSRF token retrieved from the cookies to the form data
    formData.append('csrfmiddlewaretoken', getCookie('csrftoken'));

    try {
      const response = await fetch('http://127.0.0.1:8000/student/student-facial-recognition-login/', { // Replace with your actual backend API endpoint
        method: 'POST',
        body: formData,
        credentials: 'include', //necessary for cookies to be sent with the request
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        // Handle successful login, e.g., redirecting the user
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    }
    setModalIsOpen(false);
  };
  //  student/student-facial-recognition-register/

  const handleRegisterSubmit = async () => {
    const imageData = await captureImageData();
    // Create a FormData object to send the CRN, email, username, and image data
    const formData = new FormData();
    formData.append('crn', crn);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('image', imageData);
    formData.append('csrfmiddlewaretoken', getCookie('csrftoken'));

    try {
      const response = await fetch('http://127.0.0.1:8000/student/student-facial-recognition-register/', { // Replace with your actual backend API endpoint    
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        // Handle successful registration, e.g., redirecting the user
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
    }
    setModalIsOpen(false);
  };


  const handleLogin = () => {
    setModalIsOpen(true);
    setIsRegistering(false);
  };


  const handleRegister = () => {
    setModalIsOpen(true);
    setIsRegistering(true);
  };



  const closeModal = () => {
    setModalIsOpen(false);
  };


  // Add these animation variants inside your component, before the return statement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
      className="facial_recognition-page-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="facial_recognition-page-h1"
        variants={itemVariants}
      >
        Facial Recognition
      </motion.h1>

      <motion.div
        className="fr-webcam-container"
        variants={itemVariants}
      >
        <video ref={videoRef} style={{ width: '100%' }} />
      </motion.div>

      <motion.div
        className="fr-buttons-container"
        variants={containerVariants}
      >
        <motion.button
          className="facial_recognition-login-btn"
          onClick={handleLogin}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 25px rgba(0, 112, 74, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        <motion.button
          className="facial_recognition-register-btn"
          onClick={handleRegister}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 25px rgba(0, 85, 184, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </motion.div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Credentials Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        {isRegistering ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Register
            </motion.h2>
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              type="text"
              placeholder="Enter CRN..."
              value={crn}
              onChange={(e) => setCrn(e.target.value)}
            />
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              type="text"
              placeholder="Enter Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleRegisterSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Registration
            </motion.button>
          </>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Login
            </motion.h2>
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              type="text"
              placeholder="Enter CRN..."
              value={crn}
              onChange={(e) => setCrn(e.target.value)}
            />
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleLoginSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Login
            </motion.button>
          </>
        )}
      </Modal>

      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </motion.div>
  );
};

export default FacialRecognitionPage;