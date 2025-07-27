import { useEffect, useState, useCallback } from 'react';

interface UseResizeManagementProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  minWidth?: number;
  minHeight?: number;
}

export const useResizeManagement = ({
  containerRef,
  minWidth = 300,
  minHeight = 300,
}: UseResizeManagementProps) => {
  const [size, setSize] = useState({ width: 800, height: 600 });

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize({
        width: Math.max(minWidth, rect.width),
        height: Math.max(minHeight, rect.height),
      });
    }
  }, [containerRef, minWidth, minHeight]);

  useEffect(() => {
    updateSize();
    
    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateSize]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, updateSize]);

  return { size, updateSize };
}; 