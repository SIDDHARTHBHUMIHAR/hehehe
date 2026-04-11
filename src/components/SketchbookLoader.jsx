import { useEffect, useState } from 'react';

const SketchbookLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="sketchbook-loader">
      <div className="pencil-loader"></div>
      <div className="loading-text">
        Preparing sketchbook
        <span className="loading-dots"></span>
      </div>
      <div style={{
        width: '200px',
        height: '4px',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '2px',
        marginTop: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)',
          transition: 'width 0.3s ease',
          borderRadius: '2px'
        }}></div>
      </div>
    </div>
  );
};

export default SketchbookLoader;