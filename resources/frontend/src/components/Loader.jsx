import React, { useState, useEffect } from 'react';

const EnhancedLoadingScreen = ({ Logo }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <style>
          {`
          @keyframes grow-shrink {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes leafSway {
            0%, 100% {
              transform: rotate(-2deg);
            }
            50% {
              transform: rotate(2deg);
            }
          }
          
          @keyframes dotPulse {
            0%, 20% {
              color: #10b981;
            }
            40% {
              color: #065f46;
            }
            60%, 100% {
              color: #10b981;
            }
          }
          
          .animate-grow-shrink {
            animation: grow-shrink 2s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          
          .animate-shimmer {
            background: linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%);
            background-size: 200% 100%;
            animation: shimmer 2s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .animate-leaf-sway {
            animation: leafSway 2.5s ease-in-out infinite;
          }
          
          .animate-dot-pulse {
            animation: dotPulse 1.5s ease-in-out infinite;
          }
          
          .loading-bg {
            background: 
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(167, 243, 208, 0.05) 0%, transparent 50%),
              linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          }
          
          @media (max-width: 768px) {
            .mobile-text {
              font-size: 2rem;
            }
            .mobile-subtitle {
              font-size: 0.875rem;
            }
            .mobile-logo {
              height: 6rem;
            }
          }
          
          @media (max-width: 480px) {
            .mobile-text {
              font-size: 1.5rem;
            }
            .mobile-subtitle {
              font-size: 0.75rem;
            }
            .mobile-logo {
              height: 4rem;
            }
          }
        `}
        </style>

        <div className="fixed inset-0 loading-bg flex flex-col items-center justify-center z-50 px-4">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-green-200/30 rounded-full animate-float"></div>
          <div className="absolute top-32 right-16 w-8 h-8 bg-emerald-300/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-100/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 right-10 w-6 h-6 bg-emerald-200/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Main loading content */}
          <div className="text-center max-w-md mx-auto">
            {/* Logo with enhanced animation */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-leaf-sway"></div>
              <img
                src={Logo}
                alt="Loading..."
                className="relative h-24 sm:h-28 md:h-36 mobile-logo w-auto mx-auto animate-grow-shrink animate-leaf-sway"
              />
            </div>
            
            {/* Main title with shimmer effect */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mobile-text font-bold mb-4 animate-shimmer">
                Ranveer Rose Nursery
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm sm:text-base md:text-lg mobile-subtitle text-green-700 mb-8 font-medium">
                Growing Beauty, Nurturing Nature
              </p>
            </div>
            
            {/* Loading indicator */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-pulse"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-green-600 text-xs sm:text-sm font-medium">
                Preparing your garden experience...
              </p>
            </div>
          </div>
          
          {/* Bottom decorative pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-100/20 to-transparent"></div>
          
          {/* Floating leaves decoration */}
          <div className="absolute top-1/4 left-1/4 text-green-300/40 text-2xl animate-float animate-leaf-sway">🌿</div>
          <div className="absolute top-1/3 right-1/3 text-green-400/30 text-xl animate-float" style={{ animationDelay: '1s' }}>🌱</div>
          <div className="absolute bottom-1/4 right-1/4 text-emerald-300/40 text-2xl animate-float animate-leaf-sway" style={{ animationDelay: '0.7s' }}>🍃</div>
        </div>
      </>
    );
  }

  // Return your main content when loading is false
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to Ranveer Rose Nursery!</h1>
    </div>
  );
};

export default EnhancedLoadingScreen;