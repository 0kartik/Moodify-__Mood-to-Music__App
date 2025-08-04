import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setTouchPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    // Initialize particles
    const initParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1
      }));
      setParticles(newParticles);
    };

    initParticles();

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.addEventListener('touchmove', handleTouchMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        ...(particle.y < 0 && { y: window.innerHeight, x: Math.random() * window.innerWidth })
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🧠",
      title: "AI Emotion Detection",
      description: "Advanced natural language processing to understand your feelings",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    },
    {
      icon: "🎵",
      title: "Curated Playlists",
      description: "Expertly crafted playlists that perfectly match your emotional state",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: "📱",
      title: "Mood History",
      description: "Track your emotional journey and rediscover your favorite mood playlists",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    }
  ];

  const currentPosition = isMobile ? touchPosition : mousePosition;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-neutral relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(${isMobile ? '400px' : '600px'} at ${currentPosition.x}px ${currentPosition.y}px, rgba(255,255,255,0.1), transparent 80%)`
        }}
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20 animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 5 : 8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-white/20 ${isMobile ? 'text-lg' : 'text-2xl'} animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            🎵
          </div>
        ))}
      </div>

      {/* Sound Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center h-32 opacity-20 pointer-events-none">
        {[...Array(isMobile ? 20 : 40)].map((_, i) => (
          <div
            key={i}
            className="bg-white/30 mx-1 rounded-t-full animate-pulse"
            style={{
              width: isMobile ? '2px' : '3px',
              height: `${Math.random() * 80 + 20}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-playfair font-bold text-white mb-4 sm:mb-6 leading-tight relative">
                <span className="relative z-10">Moodify</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 blur-xl rounded-full" />
              </h1>
              
              {/* Animated Subtitle */}
              <div className="relative">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 font-inter font-light animate-fade-in">
                  Your emotions deserve a soundtrack.
                </p>
                <div className="h-0.5 w-24 sm:w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-6 sm:mb-8" />
              </div>
            </div>

            <p className={`text-base sm:text-lg text-white/70 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto font-inter transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-4 sm:px-0`}>
              Tell us how you're feeling, and we'll create the perfect playlist to match your mood. 
              AI-powered emotion detection meets personalized music curation.
            </p>
          </div>

          {/* Enhanced CTA Button */}
          <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              onClick={() => navigate('/mood')}
              size="lg"
              className="group relative text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-white font-medium shadow-2xl overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl group-hover:animate-bounce">🎧</span>
                <span className="text-center">Let's Find Your Mood Soundtrack</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-white/80 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-4 sm:px-0`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${feature.gradient} cursor-pointer`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => isMobile && navigator.vibrate && navigator.vibrate(50)}
              >
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Additional Interactive Elements */}
          <div className={`mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-inter text-center">
              {isMobile ? 'Tap to explore' : 'Scroll down to explore'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;