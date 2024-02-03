import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingSpinner() {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress size={64} color="primary" />
      </div>
  );
}

export default LoadingSpinner;
