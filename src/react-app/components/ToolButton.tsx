import { LucideIcon } from "lucide-react";

interface Tool {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

interface ToolButtonProps {
  tool: Tool;
  isSelected: boolean;
  onClick: () => void;
}

export function ToolButton({ tool, isSelected, onClick }: ToolButtonProps) {
  const Icon = tool.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
        ${isSelected 
          ? "bg-sky-600 text-white shadow-md shadow-sky-100" 
          : "bg-white border border-sky-200 text-sky-950 hover:bg-sky-50/50 hover:border-sky-300"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {tool.label}
    </button>
  );
}
