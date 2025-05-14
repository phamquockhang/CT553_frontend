import { useState, useEffect, useCallback } from "react";

const useStickyScroll = () => {
  const [isSticky, setIsSticky] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (window.scrollY < lastScrollY) {
      setIsSticky(true);
    } else if (window.scrollY > lastScrollY && window.scrollY > 160) {
      setIsSticky(false);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // console.log(isSticky, lastScrollY);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isSticky;
};

export default useStickyScroll;
