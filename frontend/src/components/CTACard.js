import React from 'react';

const CTACard = () => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-white/20 text-center">
      <h3 className="text-2xl font-bold text-white mb-2">
        Ready to 10X Your Business?
      </h3>
      <p className="text-gray-300 mb-4">
        Get a free strategy session worth $500
      </p>
      <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
        Claim Your Free Session
      </button>
    </div>
  );
};

export default CTACard;