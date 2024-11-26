// src/components/NotFound.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back to home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center', // Specify textAlign as TextAlign
    marginTop: '100px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  link: {
    fontSize: '16px',
    color: '#007bff',
    textDecoration: 'none',
  }
}

export default NotFound;
