import React from 'react';
import './HowToUsePage.css';
import { motion } from 'framer-motion';

const HowToUse = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };


  return (
    <motion.div
      className="how-to-use-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.h1
        variants={headingVariants}
        className="main-title"
      >
        How to Use
      </motion.h1>

      {/* Professor Section */}
      <motion.section
        className="how-to-use-section"
        variants={sectionVariants}
      >
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2 variants={headingVariants}>For Professors:</motion.h2>
          <motion.p>
            Manage your classes effectively with my Class Attendance System by selecting the 'Professor; option. My intuitive interface provides you with the flexibility to handle all your class attendance needs seamlessly. Upon choosing to 'Login', you can access your existing classes with ease. Enter your unique credentials and gain insights into attendance patterns, download reports, and adjust settings specific to each class.

            If you're starting a new semester or need to add a new class, the 'Create' option simplifies this process. With just a few clicks, you can enter course details, set up schedules, and establish your class within the system. My platform ensures that setting up a new class is straightforward and hassle-free.

            Occasionally, you may need to remove a class from the system. The 'Delete' function allows you to do this securely and efficiently. Whether a class has concluded or been canceled, you can ensure that all associated data is removed in compliance with data protection standards.

            Beyond these core functions, my platform offers a range of tools designed to enhance your teaching experience. Customize attendance criteria, engage with student attendance trends, and leverage my analytics for informed decision-making. With my system, you have the power to manage every aspect of class attendance, giving you more time to focus on what you do best—teaching.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Student Section */}
      <motion.section
        className="how-to-use-section"
        variants={sectionVariants}
      >
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2 variants={headingVariants}>For Students:</motion.h2>
          <motion.p>
            Recording your attendance is straightforward and secure with my 'Student' portal. Begin by clicking on the 'Student' button from the homepage. You will be prompted to enter the Course Reference Number (CRN) assigned to your class. Once entered, you will be directed to choose between two state-of-the-art attendance verification systems - Facial Recognition or QR Code scanning.

            For the Facial Recognition option, ensure your device's camera is enabled. Position yourself in clear view of the camera and follow the on-screen instructions to capture your attendance. The system will compare your image against the class database in real-time, providing a quick and seamless verification process.

            If you opt for the QR Code system, use your device's camera to scan the unique QR code provided by your instructor at the start of the class. The code will be scanned, and your attendance will be logged instantly. This method is especially useful if you're attending the class remotely or prefer a contactless check-in process.

            Whichever system you choose, my platform guarantees a user-friendly experience. Should you encounter any difficulties, such as lighting issues for facial recognition or scanning errors with the QR code, simple troubleshooting steps are available within the platform. My support team is also on hand to provide assistance, ensuring your attendance is recorded promptly and accurately, every time.
          </motion.p>
        </motion.div>
      </motion.section>

    </motion.div>
  );
};

export default HowToUse;