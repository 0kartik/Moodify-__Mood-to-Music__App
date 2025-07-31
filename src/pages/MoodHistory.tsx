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
    <div className="min-h-screen bg-gradient-neutral p-4">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-playfair font-bold text-white mb-8 hover:scale-105 transition-transform"
          >
            ← Moodify
          </button>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
            Your Mood Journey
          </h1>
          <p className="text-lg text-white/80 font-inter">
            Rediscover your emotional soundtrack history
          </p>
        </div>

        {/* History Content */}
        {sessions.length === 0 ? (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 mb-8">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No mood history yet</h3>
              <p className="text-white/70 mb-8">
                Start creating your musical journey by sharing your emotions with us!
              </p>
              <Button
                onClick={() => navigate('/mood')}
                size="lg"
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full px-8"
              >
                Create Your First Mood
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Clear History Button */}
            <div className="text-center mb-8">
              <Button
                onClick={clearHistory}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full"
              >
                🗑️ Clear History
              </Button>
            </div>

            {/* Sessions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{emoji}</div>
                        <h3 className="font-semibold text-white text-lg">{label}</h3>
                        <p className="text-sm text-white/70">{playlistTitle}</p>
                      </div>
                      
                      {session.inputText && (
                        <div className="mb-4">
                          <p className="text-sm text-white/80 italic line-clamp-2">
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
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate('/mood')}
                size="lg"
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full px-8"
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