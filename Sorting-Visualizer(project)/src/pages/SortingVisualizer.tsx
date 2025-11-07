import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, RotateCcw, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrayBar } from "@/components/sorting/ArrayBar";
import { CodePanel } from "@/components/sorting/CodePanel";
import { generateRandomArray, SortingStep, algorithms } from "@/lib/sortingAlgorithms";

const SortingVisualizer = () => {
  const [algorithm, setAlgorithm] = useState<string>("bubble");
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(20);
  const [customInput, setCustomInput] = useState("");
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const codeLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    handleGenerateArray();
  }, []);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 - speed * 9);
      return () => clearTimeout(timeout);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleGenerateArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [arraySize]);

  const handleCustomArray = useCallback(() => {
    const values = customInput.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    if (values.length > 0) {
      setArray(values);
      setArraySize(values.length);
      setSteps([]);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [customInput]);

  const handleVisualize = useCallback(() => {
    if (array.length === 0) return;
    const sortingSteps = algorithms[algorithm].function([...array]);
    setSteps(sortingSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array, algorithm]);

  const handlePlayPause = useCallback(() => {
    if (steps.length === 0) {
      handleVisualize();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, steps.length, handleVisualize]);

  const handleStepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(false);
    }
  }, [currentStep, steps.length]);

  const handleStepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const currentArray = steps.length > 0 ? steps[currentStep].array : array;
  const currentHighlights = steps.length > 0 ? steps[currentStep].highlights : [];
  const currentCodeLine = steps.length > 0 ? steps[currentStep].codeLine : 0;

  // Auto-scroll to current code line
  useEffect(() => {
    if (codeLineRefs.current[currentCodeLine]) {
      codeLineRefs.current[currentCodeLine]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentCodeLine]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-4 max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sorting Algorithms Visualizer</h1>
            <p className="text-sm text-muted-foreground">Watch algorithms sort in real-time with synchronized code</p>
          </div>
        </div>

        {/* Top Section: Algorithm Selection & Array Configuration */}
        <div className="config-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Algorithm Selection */}
          <div className="bg-card rounded-lg shadow-card p-3 animate-fade-in">
            <h3 className="font-semibold text-sm mb-2">Algorithm</h3>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
                <SelectItem value="heap">Heap Sort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Array Size */}
          <div className="bg-card rounded-lg shadow-card p-3 animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <h3 className="font-semibold text-sm mb-2">Array Size: {arraySize}</h3>
            <div className="flex items-center gap-2">
              <Slider
                value={[arraySize]}
                onValueChange={([value]) => setArraySize(value)}
                min={5}
                max={50}
                step={1}
                className="flex-1"
              />
              <Button onClick={handleGenerateArray} variant="outline" size="sm">
                <Shuffle className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Custom Array */}
          <div className="bg-card rounded-lg shadow-card p-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold text-sm mb-2">Custom Array</h3>
            <div className="flex gap-2">
              <Input
                placeholder="5,2,8,1,9"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="text-sm h-9"
              />
              <Button onClick={handleCustomArray} variant="secondary" size="sm">Set</Button>
            </div>
          </div>
        </div>

        {/* Main Frame: Visualization + Code + Controls */}
        <div className="main-frame flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
          {/* Main Visual Panel: Visualization (Left) + Code Implementation (Right) */}
          <div className="main-visual-panel flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            {/* Visualization Area (Left - 65%) */}
            <div className="lg:col-span-3 bg-card rounded-lg shadow-card p-4 animate-scale-in flex flex-col">
              <h3 className="font-semibold text-sm mb-2">Visualization</h3>
              <div className="flex-1 flex items-end justify-center gap-1 bg-secondary/30 rounded-lg p-3 overflow-hidden">
                {currentArray.map((value, idx) => (
                  <ArrayBar
                    key={idx}
                    value={value}
                    maxValue={Math.max(...array)}
                    highlight={currentHighlights[idx]}
                    totalBars={currentArray.length}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-4 text-xs justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-comparing rounded"></div>
                  <span className="text-muted-foreground">Comparing</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-swapping rounded"></div>
                  <span className="text-muted-foreground">Swapping</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-sorted rounded"></div>
                  <span className="text-muted-foreground">Sorted</span>
                </div>
              </div>
            </div>

            {/* Code Implementation (Right - 35%) */}
            <div className="lg:col-span-2 animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-card rounded-lg shadow-card p-4 h-full flex flex-col">
                <h3 className="font-semibold text-sm mb-2">Code Implementation</h3>
                <div className="bg-secondary/50 rounded-lg p-3 font-mono text-xs overflow-y-auto flex-1 scroll-smooth">
                  {algorithms[algorithm]?.code.map((line, idx) => (
                    <div
                      key={idx}
                      ref={(el) => (codeLineRefs.current[idx] = el)}
                      className={`py-1 px-2 rounded transition-colors duration-200 ${
                        idx === currentCodeLine
                          ? "bg-primary/20 border-l-4 border-primary"
                          : "hover:bg-secondary/30"
                      }`}
                    >
                      <span className="text-muted-foreground mr-4 select-none">{idx + 1}</span>
                      <span className={idx === currentCodeLine ? "text-foreground font-semibold" : "text-foreground/80"}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section (Bottom) */}
          <div className="controls-section flex-shrink-0 bg-card rounded-lg shadow-card p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-2 items-center">
                <Button onClick={handleStepBackward} disabled={currentStep === 0} size="sm" variant="outline">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause} className="flex-1" size="sm">
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button onClick={handleStepForward} disabled={currentStep === steps.length - 1} size="sm" variant="outline">
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button onClick={handleRestart} disabled={currentStep === 0} size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs text-muted-foreground whitespace-nowrap">Speed: {speed}%</label>
                <Slider
                  value={[speed]}
                  onValueChange={([value]) => setSpeed(value)}
                  min={10}
                  max={100}
                  step={10}
                  className="flex-1"
                />
                {steps.length > 0 && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {currentStep + 1}/{steps.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
