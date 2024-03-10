import { useState, useEffect } from 'react';

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setViewportSize(getViewportSize());
    };
    setViewportSize(getViewportSize());

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return viewportSize;
};

const getViewportSize = () => {

  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 640) {
      console.log('xs')
      return 'xs';
    } else if (width < 768) {
      console.log('sm')
      return 'sm';
    } else {
      console.log('md')
      return 'md';
    }
  }
  return ''
};

export default useViewportSize;
