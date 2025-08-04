import { cn } from "@/lib/utils";

interface MoodButtonProps {
  emoji: string;
  label: string;
  mood: string;
  onClick: (mood: string) => void;
  className?: string;
}

export const MoodButton = ({ emoji, label, mood, onClick, className }: MoodButtonProps) => {
  return (
    <button
      onClick={() => onClick(mood)}
      className={cn(
        "group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 border-transparent",
        "bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300",
        "hover:scale-105 hover:shadow-lg active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-white/50",
        "min-h-[90px] sm:min-h-[110px]",
        className
      )}
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 transition-transform duration-200 group-hover:scale-110">
        {emoji}
      </div>
      <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white text-center leading-tight">
        {label}
      </span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};