import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PlaylistEmbedProps {
  mood: string;
  className?: string;
}

const languages = [
  { code: 'english', name: 'English', flag: '🇺🇸' },
  { code: 'telugu', name: 'Telugu', flag: '🇮🇳' },
  { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tamil', name: 'Tamil', flag: '🇮🇳' },
  { code: 'punjabi', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'spanish', name: 'Spanish', flag: '🇪🇸' }
];

const playlistMap: Record<string, Record<string, { title: string; url: string }>> = {
  happy: {
    english: { title: "Happy Hits", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator" },
    telugu: { title: "Telugu Happy Songs", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2UT3NuRgcHd?utm_source=generator" },
    hindi: { title: "Bollywood Happy", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator" },
    tamil: { title: "Tamil Happy Mix", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2ZesOOXIKtD?utm_source=generator" },
    punjabi: { title: "Punjabi Party", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1d5g8nrFFHC?utm_source=generator" },
    spanish: { title: "Spanish Happy", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX10zKzsJ2jva?utm_source=generator" }
  },
  sad: {
    english: { title: "Rainy Day Chill", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR?utm_source=generator" },
    telugu: { title: "Telugu Sad Songs", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUEWjDsV7AgX?utm_source=generator" },
    hindi: { title: "Bollywood Sad", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1?utm_source=generator" },
    tamil: { title: "Tamil Melancholy", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX6aTaZa0K6VA?utm_source=generator" },
    punjabi: { title: "Punjabi Sad", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1rVvRgjX59F?utm_source=generator" },
    spanish: { title: "Spanish Ballads", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0h0QnLkMBl4?utm_source=generator" }
  },
  calm: {
    english: { title: "Calm Vibes", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator" },
    telugu: { title: "Telugu Peaceful", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdMUUSqm9tTc?utm_source=generator" },
    hindi: { title: "Hindi Chill", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7K31D69s4M1?utm_source=generator" },
    tamil: { title: "Tamil Serenity", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX59NCqCqJtoH?utm_source=generator" },
    punjabi: { title: "Punjabi Peaceful", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPLcfKsn6c2?utm_source=generator" },
    spanish: { title: "Spanish Chill", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX13ZzXoot6Jc?utm_source=generator" }
  },
  anxious: {
    english: { title: "De-stress Lo-fi", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX6sCJFCJIfiB?utm_source=generator" },
    telugu: { title: "Telugu Relaxing", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8gDIpdqp1XJ?utm_source=generator" },
    hindi: { title: "Hindi Meditation", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator" },
    tamil: { title: "Tamil Healing", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Pr4FIGSmhV?utm_source=generator" },
    punjabi: { title: "Punjabi Soothing", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4E3UdUs7fUx?utm_source=generator" },
    spanish: { title: "Spanish Relax", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZMjdGUJUBWF?utm_source=generator" }
  },
  angry: {
    english: { title: "Smash the Stress", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator" },
    telugu: { title: "Telugu Angry Songs", url: "https://open.spotify.com/embed/playlist/6QI6yorpWKr3Q0UBwKhzOo?utm_source=generator" },
    hindi: { title: "Bollywood Rock", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX6xZZEgC9Ubl?utm_source=generator" },
    tamil: { title: "Tamil Energy", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXa8NOEUWPn9W?utm_source=generator" },
    punjabi: { title: "Punjabi Power", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyCV0n2jNh?utm_source=generator" },
    spanish: { title: "Spanish Rock", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8FwnYE6PRvL?utm_source=generator" }
  },
  romantic: {
    english: { title: "Feel the Love", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator" },
    telugu: { title: "Telugu Love Songs", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX44F1QWqYoaV?utm_source=generator" },
    hindi: { title: "Bollywood Romance", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWXe9gFZP0gtP?utm_source=generator" },
    tamil: { title: "Tamil Romance", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbYM3nMM0oPk?utm_source=generator" },
    punjabi: { title: "Punjabi Love", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634?utm_source=generator" },
    spanish: { title: "Spanish Romance", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWTbzTm9WYJ6z?utm_source=generator" }
  },
  energetic: {
    english: { title: "Pump Up Mix", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxcBWuJkbcy?utm_source=generator" },
    telugu: { title: "Telugu Energy", url: "https://open.spotify.com/embed/playlist/5AjguFfQcwckxklPO4XvT5si=v7NHNb4tRS2dFKA5UAEVsA?utm_source=generator" },
    hindi: { title: "Bollywood Workout", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator" },
    tamil: { title: "Tamil Workout", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWJOmJ7nRx0C?utm_source=generator" },
    punjabi: { title: "Punjabi Pump", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbGbOrjF3jct?utm_source=generator" },
    spanish: { title: "Spanish Energy", url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXaiCRnDWI769?utm_source=generator" }
  }
};

export const PlaylistEmbed = ({ mood, className }: PlaylistEmbedProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  
  const moodPlaylists = playlistMap[mood] || playlistMap.calm;
  const playlist = moodPlaylists[selectedLanguage] || moodPlaylists.english;

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Language Selection */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-xs sm:text-sm font-medium text-white/80 mb-2 sm:mb-3 text-center">Choose Language:</h4>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              variant={selectedLanguage === lang.code ? "default" : "outline"}
              size="sm"
              className={`
                ${selectedLanguage === lang.code 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                } 
                rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs
              `}
            >
              <span className="block sm:hidden">{lang.flag}</span>
              <span className="hidden sm:block">{lang.flag} {lang.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Playlist Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 text-center px-2">
        🎵 {playlist.title}
      </h3>
      
      {/* Playlist Embed */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-1 sm:p-2">
        <iframe
          src={playlist.url}
          width="100%"
          height="300"
          frameBorder="0"
          allowTransparency={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl h-[300px] sm:h-[352px]"
        />
      </div>
    </div>
  );
};