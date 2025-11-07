import { algorithms } from "@/lib/sortingAlgorithms";

interface CodePanelProps {
  algorithm: string;
  currentLine: number;
}

export const CodePanel = ({ algorithm, currentLine }: CodePanelProps) => {
  const code = algorithms[algorithm]?.code || [];

  return (
    <div className="bg-card rounded-lg shadow-card p-4 h-full">
      <h3 className="font-semibold mb-3">Code Implementation</h3>
      <div className="bg-secondary/50 rounded-lg p-3 font-mono text-xs overflow-y-auto max-h-[280px]">
        {code.map((line, idx) => (
          <div
            key={idx}
            className={`py-1 px-2 rounded transition-colors duration-200 ${
              idx === currentLine
                ? "bg-primary/20 border-l-4 border-primary"
                : "hover:bg-secondary/30"
            }`}
          >
            <span className="text-muted-foreground mr-4 select-none">{idx + 1}</span>
            <span className={idx === currentLine ? "text-foreground font-semibold" : "text-foreground/80"}>
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
