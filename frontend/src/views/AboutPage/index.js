import React from 'react';
import './AboutPage.css';
import { motion } from 'framer-motion';

const About = () => {

  // Animation variants
  const containerVariants = { // The variants for the container
    hidden: { opacity: 0 }, // The hidden state of the container is opacity 0
    visible: {
      opacity: 1,
      transition: { // The transition for the container is a delay of 0.3 seconds between each section
        staggerChildren: 0.3 // Delay between each section
      }
    }
  };



  const sectionVariants = { // The variants for the sections
    hidden: { // The hidden state of the section is opacity 0 and y 50
      opacity: 0,
      y: 50
    },
    visible: { // The visible state of the section is opacity 1 and y 0
      opacity: 1,
      y: 0,
      transition: { // The transition for the section is a duration of 0.8 seconds and easeOut
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };



  const headingVariants = { // The variants for the headings
    hidden: { // The hidden state of the heading is opacity 0 and x -50
      opacity: 0,
      x: -50
    },
    visible: { // The visible state of the heading is opacity 1 and x 0
      opacity: 1,
      x: 0,
      transition: { // The transition for the heading is a duration of 0.5 seconds and easeOut
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };




  return (
    <motion.div
      className="about-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* About Section */}
      <motion.section
        variants={sectionVariants}
        className="about-section"
      >
        <motion.h1 variants={headingVariants}>About</motion.h1>
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p>Class Attendance Using Facial Recognition is the leading-edge solution tailored to meet the modern demands of academic class management and attendance tracking. My innovative platform is meticulously crafted to cater to the unique needs of both educators and students, streamlining the attendance process with cutting-edge facial recognition technology.
            For professors, my system offers an unparalleled blend of simplicity and efficiency. Set up your classes with just a few clicks and let my robust facial recognition software automatically record attendance as students enter the classroom. No more manual roll calls or cumbersome sign-in sheets; instead, enjoy a real-time attendance dashboard that offers instant insights into student participation.
            Students benefit from a hassle-free check-in process that respects their time and privacy. With my secure facial recognition technology, students simply show up to class and are instantly accounted for, allowing them to focus on the learning experience without the interruption of traditional attendance methods.
            Behind the scenes, my platform employs the most stringent security measures to protect personal data, ensuring that privacy is upheld to the highest standard. I'm committed to the responsible use of technology, and my system is designed to be both GDPR and FERPA compliant.
            As the landscape of education continues to evolve, so too does my platform. I am constantly refining my algorithms, enhancing my features, and expanding my services to provide an experience that not only meets but exceeds the expectations of my academic institutions and their students.
            Choose Class Attendance Using Facial Recognition and join a growing network of educational institutions that are embracing the future of attendance management. my mission is to empower your academic journey with technology that is reliable, efficient, and forward-thinking.</p>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        variants={sectionVariants}
        className="about-section"
      >
        <motion.h1 variants={headingVariants}>My Mission</motion.h1>
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p>At the heart of Class Attendance Using Facial Recognition, my mission is to transform the educational landscape by providing educators and students with powerful, intuitive technology that simplifies academic administration and elevates the learning experience. I believe that managing and tracking attendance should be effortless, allowing educators to devote more time to teaching and students to learning.
            I am committed to bridging the gap between advanced technology and everyday classroom needs. By harnessing the potential of facial recognition for attendance tracking, I offer a solution that not only streamlines administrative tasks but also provides actionable insights into classroom dynamics.
            My vision is to create a more connected and engaged learning environment. Through my platform, I aim to foster a culture of attendance and participation that is essential for academic success. I strive to support educational institutions in their pursuit of excellence and to provide students with the tools they need to succeed academically.
            Innovation lies at the core of my approach. I continuously seek out new ways to enhance my platform, ensuring that it remains at the forefront of educational technology. I listen to the educators and students who use my system, adapting and evolving to meet their changing needs.
            By partnering with Class Attendance Using Facial Recognition, educational communities gain more than just a product—they gain a dedicated ally in the quest to enhance teaching and learning outcomes. Together, I am setting new standards for academic excellence and building a future where technology and education go hand in hand.</p>
        </motion.div>
      </motion.section>

      {/* Features for Professors Section */}
      <motion.section
        variants={sectionVariants}
        className="about-section"
      >
        <motion.h1 variants={headingVariants}>Features for Professors</motion.h1>
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p>My platform equips professors with an array of powerful tools designed to streamline the multifaceted demands of class management and attendance reporting. At the core of my offering is a user-friendly interface that simplifies navigation and provides quick access to a suite of features:</p>
          <motion.ul>
            {['Automated Attendance Tracking', 'Seamless Integration', 'Accessible Anywhere', 'Enhanced Classroom Experience'].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <strong>{feature}:</strong> {/* Add feature description here */}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.section>

      {/* Features for Students Section */}
      <motion.section
        variants={sectionVariants}
        className="about-section"
      >
        <motion.h1 variants={headingVariants}>Features for Students</motion.h1>
        <motion.div
          className="content-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p>My state-of-the-art system empowers students with a seamless process for marking attendance, harnessing the latest advancements in facial recognition and QR code technology. This dual-modality approach ensures that students have access to a convenient and flexible attendance experience that fits a variety of classroom settings.
            With facial recognition, students can simply walk into the classroom, and my system will instantly recognize and verify their attendance, allowing them to settle into their learning environment without any manual check-ins. This touchless system not only saves time but also enhances security, as it's designed to recognize each student accurately.
            Alternatively, my QR code technology provides a quick and easy method for attendance. At the start of each class, students can scan a unique QR code provided by the professor using their smartphones or devices. This method is particularly useful for large lectures or when students are attending sessions remotely.
            In addition to these attendance methods, my platform offers students the ability to view their attendance records in real-time, giving them the transparency to monitor their own attendance patterns and maintain accountability for their academic commitments.
            Privacy is paramount, and I ensure that all data is encrypted and stored securely, complying with the highest standards of data protection. My commitment to privacy means that students can trust in the confidentiality and security of their personal information at all times.
            By simplifying the attendance process, students are afforded more time to focus on what's truly important—their education. The Class Attendance Using Facial Recognition system streamlines administrative tasks, allowing students to engage fully with their academic pursuits and maximize their classroom experience.</p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default About;