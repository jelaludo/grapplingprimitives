import { useCallback, useEffect, useState } from 'react';

export function useFullscreen(targetRef?: React.RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(async () => {
    try {
      const el = targetRef?.current ?? document.documentElement;
      if (!document.fullscreenElement && el?.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch {/* ignore */}
  }, [targetRef]);

  const exit = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {/* ignore */}
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) return exit();
    return enter();
  }, [enter, exit]);

  return { isFullscreen, enterFullscreen: enter, exitFullscreen: exit, toggleFullscreen: toggle };
}


