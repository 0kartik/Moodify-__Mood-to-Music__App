import { cn } from "@/lib/utils";

interface PlaylistEmbedProps {
  mood: string;
  className?: string;
}

const playlistMap: Record<string, { title: string; url: string }> = {
  happy: {
    title: "Happy Hits",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator"
  },
  sad: {
    title: "Rainy Day Chill",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR?utm_source=generator"
  },
  calm: {
    title: "Calm Vibes",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator"
  },
  anxious: {
    title: "De-stress Lo-fi",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX6sCJFCJIfiB?utm_source=generator"
  },
  angry: {
    title: "Smash the Stress",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0?utm_source=generator"
  },
  romantic: {
    title: "Feel the Love",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator"
  },
  energetic: {
    title: "Pump Up Mix",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxcBWuJkbcy?utm_source=generator"
  }
};

export const PlaylistEmbed = ({ mood, className }: PlaylistEmbedProps) => {
  const playlist = playlistMap[mood] || playlistMap.calm;

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        🎵 {playlist.title}
      </h3>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-2">
        <iframe
          src={playlist.url}
          width="100%"
          height="352"
          frameBorder="0"
          allowTransparency={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};