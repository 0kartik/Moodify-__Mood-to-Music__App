import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoodButton } from "@/components/MoodButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😠", label: "Angry", value: "angry" },
  { emoji: "💖", label: "Romantic", value: "romantic" },
  { emoji: "🔥", label: "Energetic", value: "energetic" }
];

const MoodInput = () => {
  const [textInput, setTextInput] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const detectMoodFromText = async (text: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll use a simple keyword-based detection
      // In production, this would call OpenAI API
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited') || lowerText.includes('great')) {
        return 'happy';
      } else if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed') || lowerText.includes('low')) {
        return 'sad';
      } else if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed') || lowerText.includes('chill')) {
        return 'calm';
      } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('stressed') || lowerText.includes('nervous')) {
        return 'anxious';
      } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('furious') || lowerText.includes('rage')) {
        return 'angry';
      } else if (lowerText.includes('love') || lowerText.includes('romantic') || lowerText.includes('romance') || lowerText.includes('heart')) {
        return 'romantic';
      } else if (lowerText.includes('energy') || lowerText.includes('pumped') || lowerText.includes('motivated') || lowerText.includes('active')) {
        return 'energetic';
      } else {
        return 'calm'; // Default fallback
      }
    } catch (error) {
      console.error('Error detecting mood:', error);
      return 'calm';
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    setTextInput(""); // Clear text input when emoji is selected
  };

  const handleGeneratePlaylist = async () => {
    let finalMood = selectedMood;

    if (!selectedMood && textInput.trim()) {
      finalMood = await detectMoodFromText(textInput);
    }

    if (!finalMood && !textInput.trim()) {
      toast({
        title: "Please select a mood or describe your feelings",
        description: "We need to know how you're feeling to create your perfect playlist!",
        variant: "destructive"
      });
      return;
    }

    // Save mood session to localStorage
    const moodSession = {
      mood: finalMood,
      inputText: textInput || "",
      timestamp: new Date().toISOString()
    };

    const existingSessions = JSON.parse(localStorage.getItem('moodSessions') || '[]');
    localStorage.setItem('moodSessions', JSON.stringify([moodSession, ...existingSessions]));

    // Navigate to results
    navigate(`/playlist?mood=${finalMood}&input=${encodeURIComponent(textInput)}`);
  };

  const backgroundClass = selectedMood ? `bg-gradient-${selectedMood}` : 'bg-gradient-neutral';

  return (
    <div className={`min-h-screen ${backgroundClass} p-3 sm:p-4 lg:p-6 transition-all duration-500`}>
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
            How are you feeling right now?
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-inter px-4">
            Choose an emoji or describe your emotions in words
          </p>
        </div>

        {/* Mood Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          {moods.map((mood) => (
            <MoodButton
              key={mood.value}
              emoji={mood.emoji}
              label={mood.label}
              mood={mood.value}
              onClick={handleMoodSelection}
              className={selectedMood === mood.value ? "ring-2 ring-white/50 bg-white/30" : ""}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 px-4">
          <div className="h-px bg-white/30 flex-1 max-w-24 sm:max-w-32"></div>
          <span className="px-3 sm:px-4 text-sm sm:text-base text-white/60 font-inter">or</span>
          <div className="h-px bg-white/30 flex-1 max-w-24 sm:max-w-32"></div>
        </div>

        {/* Text Input */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <Textarea
            placeholder="Type what's on your mind... (e.g., 'Feeling overwhelmed with work', 'So excited about the weekend!', 'Need something calming')"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setSelectedMood(null); // Clear emoji selection when typing
            }}
            className="min-h-[100px] sm:min-h-[120px] bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/50 resize-none rounded-2xl text-base sm:text-lg p-4 sm:p-6"
          />
        </div>

        {/* Generate Button */}
        <div className="text-center px-4">
          <Button
            onClick={handleGeneratePlaylist}
            disabled={isLoading}
            size="lg"
            className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-white font-medium shadow-2xl disabled:opacity-50 w-full sm:w-auto"
          >
            {isLoading ? (
              <>🎵 Analyzing your mood...</>
            ) : (
              <>🎧 Generate My Playlist</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodInput;