interface ArrayBarProps {
  value: number;
  maxValue: number;
  highlight: "comparing" | "swapping" | "sorted" | "none";
  totalBars: number;
}

export const ArrayBar = ({ value, maxValue, highlight, totalBars }: ArrayBarProps) => {
  const heightPercentage = (value / maxValue) * 100;
  
  const getBarColor = () => {
    switch (highlight) {
      case "comparing":
        return "bg-comparing";
      case "swapping":
        return "bg-swapping";
      case "sorted":
        return "bg-sorted";
      default:
        return "bg-primary";
    }
  };

  const barWidth = totalBars > 30 ? "w-2" : totalBars > 20 ? "w-4" : "w-6";

  return (
    <div className="flex flex-col items-center justify-end h-full">
      <div
        className={`${barWidth} ${getBarColor()} rounded-t transition-all duration-300 ease-out shadow-sm`}
        style={{ height: `${heightPercentage}%` }}
      />
      {totalBars <= 20 && (
        <span className="text-xs text-muted-foreground mt-1">{value}</span>
      )}
    </div>
  );
};
