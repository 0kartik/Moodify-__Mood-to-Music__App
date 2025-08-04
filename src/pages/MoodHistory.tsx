import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MoodSession {
  mood: string;
  inputText: string;
  timestamp: string;
}

const moodEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😢", 
  calm: "😌",
  anxious: "😰",
  angry: "😠",
  romantic: "💖",
  energetic: "🔥"
};

const moodLabels: Record<string, string> = {
  happy: "Happy",
  sad: "Sad",
  calm: "Calm", 
  anxious: "Anxious",
  angry: "Angry",
  romantic: "Romantic",
  energetic: "Energetic"
};

const playlistTitles: Record<string, string> = {
  happy: "Happy Hits",
  sad: "Rainy Day Chill",
  calm: "Calm Vibes",
  anxious: "De-stress Lo-fi",
  angry: "Smash the Stress", 
  romantic: "Feel the Love",
  energetic: "Pump Up Mix"
};

const MoodHistory = () => {
  const [sessions, setSessions] = useState<MoodSession[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('moodSessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSessionClick = (session: MoodSession) => {
    navigate(`/playlist?mood=${session.mood}&input=${encodeURIComponent(session.inputText)}`);
  };

  const clearHistory = () => {
    localStorage.removeItem('moodSessions');
    setSessions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-neutral p-3 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <button 
            onClick={() => navigate('/')}
            className="text-xl sm:text-2xl font-playfair font-bold text-white mb-6 sm:mb-8 hover:scale-105 transition-transform"
          >
            ← Moodify
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6 px-4">
            Your Mood Journey
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-inter px-4">
            Rediscover your emotional soundtrack history
          </p>
        </div>

        {/* History Content */}
        {sessions.length === 0 ? (
          <div className="text-center px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎵</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">No mood history yet</h3>
              <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 px-2">
                Start creating your musical journey by sharing your emotions with us!
              </p>
              <Button
                onClick={() => navigate('/mood')}
                size="lg"
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full px-6 sm:px-8 w-full sm:w-auto"
              >
                Create Your First Mood
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Clear History Button */}
            <div className="text-center mb-6 sm:mb-8">
              <Button
                onClick={clearHistory}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full text-sm sm:text-base px-4 sm:px-6"
              >
                🗑️ Clear History
              </Button>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
              {sessions.map((session, index) => {
                const emoji = moodEmojis[session.mood] || "😌";
                const label = moodLabels[session.mood] || "Calm";
                const playlistTitle = playlistTitles[session.mood] || "Chill Mix";

                return (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => handleSessionClick(session)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-center mb-3 sm:mb-4">
                        <div className="text-3xl sm:text-4xl mb-2">{emoji}</div>
                        <h3 className="font-semibold text-white text-base sm:text-lg">{label}</h3>
                        <p className="text-xs sm:text-sm text-white/70">{playlistTitle}</p>
                      </div>
                      
                      {session.inputText && (
                        <div className="mb-3 sm:mb-4">
                          <p className="text-xs sm:text-sm text-white/80 italic line-clamp-2 px-1">
                            "{session.inputText}"
                          </p>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <p className="text-xs text-white/60">
                          {formatDate(session.timestamp)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* New Mood Button */}
            <div className="text-center mt-8 sm:mt-12 px-4">
              <Button
                onClick={() => navigate('/mood')}
                size="lg"
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full px-6 sm:px-8 w-full sm:w-auto"
              >
                🎧 Create New Mood Playlist
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;