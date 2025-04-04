
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize(prevSize =>
        prevSize.width === innerWidth && prevSize.height === innerHeight
          ? prevSize
          : { width: innerWidth, height: innerHeight }
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};