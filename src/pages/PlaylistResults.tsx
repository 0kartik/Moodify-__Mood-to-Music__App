import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlaylistEmbed } from "@/components/PlaylistEmbed";
import { useToast } from "@/hooks/use-toast";

const moodDescriptions: Record<string, string> = {
  happy: "We sensed you're feeling joyful! Here's an uplifting mix to amplify your positive vibes.",
  sad: "We sensed you're feeling down. Here's a gentle, comforting playlist to accompany your emotions.",
  calm: "We sensed you're feeling peaceful. Here's a soft ambient mix to match your tranquil state.",
  anxious: "We sensed you're feeling overwhelmed. Here's a soothing lo-fi collection to help you unwind.",
  angry: "We sensed you're feeling frustrated. Here's an energetic mix to help you channel that intensity.",
  romantic: "We sensed you're feeling loving. Here's a tender acoustic collection for your heart.",
  energetic: "We sensed you're feeling pumped! Here's a high-energy mix to fuel your motivation."
};

const moodEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😢", 
  calm: "😌",
  anxious: "😰",
  angry: "😠",
  romantic: "💖",
  energetic: "🔥"
};

const PlaylistResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  const mood = searchParams.get('mood') || 'calm';
  const userInput = searchParams.get('input') || '';

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTryAgain = () => {
    navigate('/mood');
  };

  const handleSaveMood = () => {
    toast({
      title: "Mood saved! 💾",
      description: "You can find this playlist in your mood history.",
    });
  };

  const handleShare = async () => {
    const shareText = `Check out my ${mood} mood playlist on Moodify! 🎵 ${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Moodify Playlist',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied! 📋",
        description: "Share your mood playlist with friends!",
      });
    }
  };

  const backgroundClass = `bg-gradient-${mood}`;
  const emoji = moodEmojis[mood] || "😌";
  const description = moodDescriptions[mood] || moodDescriptions.calm;

  return (
    <div className={`min-h-screen ${backgroundClass} p-3 sm:p-4 lg:p-6 transition-all duration-500`}>
      <div className="max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-xl sm:text-2xl font-playfair font-bold text-white mb-6 sm:mb-8 hover:scale-105 transition-transform"
          >
            ← Moodify
          </button>
        </div>

        {/* Results Container */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Mood Detection Result */}
          <div className="text-center mb-6 sm:mb-8 px-2">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-8 py-4 mb-4 sm:mb-6 w-full max-w-md sm:max-w-none mx-auto">
              <span className="text-3xl sm:text-4xl">{emoji}</span>
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-white font-inter">
                  Detected Mood: <span className="capitalize">{mood}</span>
                </h2>
                {userInput && (
                  <p className="text-xs sm:text-sm text-white/70 font-inter break-words">
                    From: "{userInput}"
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-white/90 font-inter max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              {description}
            </p>
          </div>

          {/* Playlist Embed */}
          <div className="mb-8 sm:mb-12 px-2">
            <PlaylistEmbed mood={mood} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <Button
              onClick={handleTryAgain}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              🔁 Try Again
            </Button>
            
            <Button
              onClick={handleSaveMood}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              ❤️ Save Mood
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              📤 Share This Vibe
            </Button>

            <Button
              onClick={() => navigate('/history')}
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
            >
              📚 Mood History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistResults;