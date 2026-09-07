
import React from 'react';

interface PixelBoxProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "red" | "black";
  onClick?: () => void;
  id?: string;
}

const PixelBox: React.FC<PixelBoxProps> = ({ children, className = "", variant = "blue", onClick, id }) => {
  const bgClass = variant === "blue" 
    ? "bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 border-white border-2 outline outline-1 outline-black" 
    : variant === "red"
    ? "bg-gradient-to-b from-red-700 via-red-800 to-red-900 border-white border-2 outline outline-1 outline-black"
    : "bg-black border-slate-400 border-2 outline outline-1 outline-white";
    
  return (
    <div 
      id={id}
      onClick={onClick}
      className={`${bgClass} p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] ${className} ${onClick ? 'cursor-pointer active:translate-y-1 active:shadow-none transition-transform' : ''}`}
    >
      {children}
    </div>
  );
};

export default PixelBox;
