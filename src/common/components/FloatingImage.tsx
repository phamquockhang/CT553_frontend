import React, { useEffect, useRef } from "react";

interface FloatingImageProps {
  imageUrl: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onAnimationEnd: () => void;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  imageUrl,
  startX,
  startY,
  endX,
  endY,
  onAnimationEnd,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      // Áp dụng transform ban đầu
      img.style.transform = `translate(${startX}px, ${startY}px)`;
      // Sử dụng requestAnimationFrame để cho phép hiệu ứng chạy sau khi render
      requestAnimationFrame(() => {
        img.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        img.style.transform = `translate(${endX}px, ${endY}px) scale(0.2)`;
      });
      // Lắng nghe sự kiện kết thúc animation
      const handleTransitionEnd = () => {
        onAnimationEnd();
      };
      img.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        img.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [startX, startY, endX, endY, onAnimationEnd]);

  return (
    <img
      ref={imageRef}
      src={imageUrl}
      alt="Floating product"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "80px",
        height: "80px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default FloatingImage;
