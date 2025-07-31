import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-neutral flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight">
            Moodify
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-inter font-light">
            Your emotions deserve a soundtrack.
          </p>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto font-inter">
            Tell us how you're feeling, and we'll create the perfect playlist to match your mood. 
            AI-powered emotion detection meets personalized music curation.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/mood')}
          size="lg"
          className="text-xl px-12 py-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-white font-medium shadow-2xl"
        >
          🎧 Let's Find Your Mood Soundtrack
        </Button>

        {/* Features Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-white/80">
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="font-semibold mb-2">AI Emotion Detection</h3>
            <p className="text-sm">Advanced natural language processing to understand your feelings</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="text-3xl mb-4">🎵</div>
            <h3 className="font-semibold mb-2">Curated Playlists</h3>
            <p className="text-sm">Expertly crafted playlists that perfectly match your emotional state</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="font-semibold mb-2">Mood History</h3>
            <p className="text-sm">Track your emotional journey and rediscover your favorite mood playlists</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;