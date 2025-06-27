import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Existing + Extra Floating Shapes */}
      <div className="absolute top-10 left-1/4 w-4 h-4 bg-white/10 rotate-45 animate-[float_6s_infinite]" />
      <div className="absolute bottom-20 right-1/5 w-6 h-6 bg-purple-300/20 rounded-full animate-[float_7s_infinite] delay-1000" />
      <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-blue-300/10 rotate-12 animate-[float_8s_infinite] delay-2000" />
      <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-indigo-300/20 rounded-full animate-[float_5s_infinite] delay-3000" />

      {/* Additional Shapes */}
      <div className="absolute top-1/3 left-1/3 w-5 h-5 bg-pink-300/20 rounded-full animate-[float_9s_infinite] delay-1500" />
      <div className="absolute bottom-1/3 right-1/3 w-7 h-7 bg-yellow-300/10 rotate-45 animate-[float_6s_infinite] delay-2500" />
      <div className="absolute top-2/3 left-1/5 w-4 h-4 bg-green-300/10 rounded-full animate-[float_10s_infinite] delay-1000" />
      <div className="absolute bottom-1/4 right-1/6 w-6 h-6 bg-red-200/20 rotate-12 animate-[float_7s_infinite] delay-3000" />
      <div className="absolute top-1/6 right-1/3 w-3 h-3 bg-white/20 rotate-45 animate-[float_5s_infinite] delay-2000" />
      <div className="absolute bottom-1/2 left-1/2 w-5 h-5 bg-indigo-400/20 rounded-full animate-[float_8s_infinite] delay-1500" />
    </div>
  );
};

export default FloatingShapes;
