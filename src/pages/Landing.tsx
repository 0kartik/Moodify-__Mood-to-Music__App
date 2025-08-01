import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <div className="min-h-screen bg-gradient-neutral relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 80%)`
        }}
      />
      
      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-white/20 text-2xl animate-pulse`}
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative mb-8">
              <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight relative">
                <span className="relative z-10">Moodify</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 blur-xl rounded-full" />
              </h1>
              
              {/* Animated Subtitle */}
              <div className="relative">
                <p className="text-2xl md:text-3xl text-white/90 mb-8 font-inter font-light animate-fade-in">
                  Your emotions deserve a soundtrack.
                </p>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-8" />
              </div>
            </div>

            <p className={`text-lg text-white/70 mb-12 max-w-2xl mx-auto font-inter transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Tell us how you're feeling, and we'll create the perfect playlist to match your mood. 
              AI-powered emotion detection meets personalized music curation.
            </p>
          </div>

          {/* Enhanced CTA Button */}
          <div className={`mb-16 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              onClick={() => navigate('/mood')}
              size="lg"
              className="group relative text-xl px-12 py-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-white font-medium shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl group-hover:animate-bounce">🎧</span>
                Let's Find Your Mood Soundtrack
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Enhanced Features Grid */}
          <div className={`grid md:grid-cols-3 gap-8 text-white/80 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${feature.gradient}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Additional Interactive Elements */}
          <div className={`mt-16 flex justify-center items-center gap-4 transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm font-inter">Scroll down to explore</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;