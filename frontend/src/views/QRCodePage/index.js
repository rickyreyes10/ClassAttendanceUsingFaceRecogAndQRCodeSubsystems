import './QRCodePage.css';
import Modal from 'react-modal';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion } from 'framer-motion';

Modal.setAppElement('#root');

const QRCodePage = () => {
  const [crn, setCrn] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState(null); // State to hold the QR code image URL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const qrScannerRef = useRef(null);


  useEffect(() => {

    // This function will be called every time a QR code is scanned.
    const onScanSuccess = async (decodedText, decodedResult) => {
      // Stop scanning QR codes once we have a successful scan
      qrScannerRef.current.clear(); // Use clear() to stop scanning

      try {
        // Parse the QR code text to JSON
        const data = JSON.parse(decodedText);

        // Send the data to the backend for verification and to mark attendance
        const response = await fetch('http://127.0.0.1:8000/student/student-qr-code-login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to record attendance');
        }

        const result = await response.json();
        toast.success(result.message);
      } catch (e) {
        toast.error(`Error: ${e.message}`);
      } finally {
        // Optionally, if you want to restart scanning after an error
        // qrScannerRef.current.start();
      }
    };

    // Define the configuration for the QR scanner
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // Create a new instance of the Html5QrcodeScanner
    const html5QrCodeScanner = new Html5QrcodeScanner("qr-reader", config, false);
    qrScannerRef.current = html5QrCodeScanner;

    // Render the QR scanner component with the onScanSuccess callback
    html5QrCodeScanner.render(onScanSuccess);

    // Cleanup function to stop the scanner when the component is unmounted
    return () => {
      qrScannerRef.current.clear();
    };
  }, []); // Empty dependency array means this effect will only run on mount and unmount


  const handleRegisterSubmit = async () => {
    if (!crn || !username || !email) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/student/student-qr-code-register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crn, username, email }),
      });

      const result = await response.json();
      if (result.success) {
        const qrCodeImageUrl = `data:image/png;base64,${result.qr_code}`;
        setQrCodeImage(qrCodeImageUrl);
        setIsRegistering(false);
        toast.success(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };


  const handleRetrieveSubmit = async () => {
    // Implementation for QR code retrieval submission
    if (!crn || !username || !email) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/student/student-qr-code-retrieve/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crn, username, email })
      });

      const result = await response.json();
      if (result.success) {
        const qrCodeImageUrl = `data:image/png;base64,${result.qr_code}`;
        setQrCodeImage(qrCodeImageUrl);
        toast.success(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`Retrieval failed: ${error.message}`);
    }

  };

  const handleRegister = () => {
    setModalIsOpen(true);
    setIsRegistering(true);
  };

  const handleRetrieve = () => {
    setModalIsOpen(true);
    setIsRegistering(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsRegistering(false); // Reset the modal state
    setQrCodeImage(null); // Clear the QR code image
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
      className="QR_Code-page-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="QR_Code-page-h1"
        variants={itemVariants}
      >
        QR Code
      </motion.h1>

      <motion.div
        className="qr-scanner-container"
        variants={itemVariants}
      >
        <div id="qr-reader"></div>
      </motion.div>

      <motion.div
        className="qr-buttons-container"
        variants={containerVariants}
      >
        <motion.button
          className="QR_Code-register-btn"
          onClick={handleRegister}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 25px rgba(0, 112, 74, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
        <motion.button
          className="QR_Code-retrieve-btn"
          onClick={handleRetrieve}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 25px rgba(0, 85, 184, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Retrieve
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
        ) : qrCodeImage ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your QR Code
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Use your camera to take a picture of the QR code or take a screenshot of your display for future logins and attendance marking.
            </motion.p>
            <motion.div
              className="qr-code-image-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img src={qrCodeImage} alt="QR Code" />
            </motion.div>
            <motion.button
              onClick={closeModal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </>
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Retrieve Your QR Code
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
              onClick={handleRetrieveSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retrieve QR Code
            </motion.button>
          </>
        )}
      </Modal>

      <ToastContainer position="top-right" />
    </motion.div>
  );
};

export default QRCodePage;