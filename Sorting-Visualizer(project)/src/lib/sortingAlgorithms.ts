export type HighlightType = "comparing" | "swapping" | "sorted" | "none";

export interface SortingStep {
  array: number[];
  highlights: HighlightType[];
  codeLine: number;
}

export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

// Bubble Sort Implementation
const bubbleSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[j] = "comparing";
      highlights[j + 1] = "comparing";
      for (let k = n - i; k < n; k++) {
        highlights[k] = "sorted";
      }
      steps.push({ array: [...array], highlights, codeLine: 2 });

      if (array[j] > array[j + 1]) {
        // Swapping
        const swapHighlights: HighlightType[] = Array(n).fill("none");
        swapHighlights[j] = "swapping";
        swapHighlights[j + 1] = "swapping";
        for (let k = n - i; k < n; k++) {
          swapHighlights[k] = "sorted";
        }
        steps.push({ array: [...array], highlights: swapHighlights, codeLine: 3 });

        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        steps.push({ array: [...array], highlights: swapHighlights, codeLine: 4 });
      }
    }
  }

  // Final sorted state
  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 6,
  });

  return steps;
};

// Selection Sort Implementation
const selectionSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[minIdx] = "comparing";
      highlights[j] = "comparing";
      for (let k = 0; k < i; k++) {
        highlights[k] = "sorted";
      }
      steps.push({ array: [...array], highlights, codeLine: 3 });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const swapHighlights: HighlightType[] = Array(n).fill("none");
      swapHighlights[i] = "swapping";
      swapHighlights[minIdx] = "swapping";
      for (let k = 0; k < i; k++) {
        swapHighlights[k] = "sorted";
      }
      steps.push({ array: [...array], highlights: swapHighlights, codeLine: 8 });

      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      steps.push({ array: [...array], highlights: swapHighlights, codeLine: 9 });
    }
  }

  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 11,
  });

  return steps;
};

// Insertion Sort Implementation
const insertionSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    const highlights: HighlightType[] = Array(n).fill("none");
    highlights[i] = "comparing";
    for (let k = 0; k < i; k++) {
      highlights[k] = "sorted";
    }
    steps.push({ array: [...array], highlights, codeLine: 2 });

    while (j >= 0 && array[j] > key) {
      const moveHighlights: HighlightType[] = Array(n).fill("none");
      moveHighlights[j] = "swapping";
      moveHighlights[j + 1] = "swapping";
      steps.push({ array: [...array], highlights: moveHighlights, codeLine: 5 });

      array[j + 1] = array[j];
      j--;

      steps.push({ array: [...array], highlights: moveHighlights, codeLine: 6 });
    }

    array[j + 1] = key;
    steps.push({ array: [...array], highlights, codeLine: 8 });
  }

  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 10,
  });

  return steps;
};

// Merge Sort Implementation
const mergeSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  const merge = (left: number, mid: number, right: number) => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[k] = "comparing";
      steps.push({ array: [...array], highlights, codeLine: 4 });

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }

      const swapHighlights: HighlightType[] = Array(n).fill("none");
      swapHighlights[k] = "swapping";
      steps.push({ array: [...array], highlights: swapHighlights, codeLine: 5 });
      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[k] = "swapping";
      steps.push({ array: [...array], highlights, codeLine: 11 });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[k] = "swapping";
      steps.push({ array: [...array], highlights, codeLine: 15 });
      j++;
      k++;
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, n - 1);

  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 20,
  });

  return steps;
};

// Quick Sort Implementation
const quickSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      const highlights: HighlightType[] = Array(n).fill("none");
      highlights[j] = "comparing";
      highlights[high] = "comparing";
      steps.push({ array: [...array], highlights, codeLine: 4 });

      if (array[j] < pivot) {
        i++;
        const swapHighlights: HighlightType[] = Array(n).fill("none");
        swapHighlights[i] = "swapping";
        swapHighlights[j] = "swapping";
        steps.push({ array: [...array], highlights: swapHighlights, codeLine: 6 });

        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ array: [...array], highlights: swapHighlights, codeLine: 7 });
      }
    }

    const finalSwap: HighlightType[] = Array(n).fill("none");
    finalSwap[i + 1] = "swapping";
    finalSwap[high] = "swapping";
    steps.push({ array: [...array], highlights: finalSwap, codeLine: 10 });

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ array: [...array], highlights: finalSwap, codeLine: 11 });

    return i + 1;
  };

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, n - 1);

  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 18,
  });

  return steps;
};

// Heap Sort Implementation
const heapSort = (arr: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: Array(n).fill("none"),
    codeLine: 0,
  });

  const heapify = (n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      const highlights: HighlightType[] = Array(array.length).fill("none");
      highlights[left] = "comparing";
      highlights[largest] = "comparing";
      steps.push({ array: [...array], highlights, codeLine: 4 });

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      const highlights: HighlightType[] = Array(array.length).fill("none");
      highlights[right] = "comparing";
      highlights[largest] = "comparing";
      steps.push({ array: [...array], highlights, codeLine: 8 });

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      const swapHighlights: HighlightType[] = Array(array.length).fill("none");
      swapHighlights[i] = "swapping";
      swapHighlights[largest] = "swapping";
      steps.push({ array: [...array], highlights: swapHighlights, codeLine: 13 });

      [array[i], array[largest]] = [array[largest], array[i]];
      steps.push({ array: [...array], highlights: swapHighlights, codeLine: 14 });

      heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    const swapHighlights: HighlightType[] = Array(array.length).fill("none");
    swapHighlights[0] = "swapping";
    swapHighlights[i] = "swapping";
    steps.push({ array: [...array], highlights: swapHighlights, codeLine: 21 });

    [array[0], array[i]] = [array[i], array[0]];
    steps.push({ array: [...array], highlights: swapHighlights, codeLine: 22 });

    heapify(i, 0);
  }

  steps.push({
    array: [...array],
    highlights: Array(n).fill("sorted"),
    codeLine: 25,
  });

  return steps;
};

export const algorithms: Record<string, { function: (arr: number[]) => SortingStep[], code: string[] }> = {
  bubble: {
    function: bubbleSort,
    code: [
      "function bubbleSort(arr) {",
      "  for (let i = 0; i < n - 1; i++) {",
      "    for (let j = 0; j < n - i - 1; j++) {",
      "      if (arr[j] > arr[j + 1]) {",
      "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
      "      }",
      "    }",
      "  }",
      "  return arr;",
      "}",
    ],
  },
  selection: {
    function: selectionSort,
    code: [
      "function selectionSort(arr) {",
      "  for (let i = 0; i < n - 1; i++) {",
      "    let minIdx = i;",
      "    for (let j = i + 1; j < n; j++) {",
      "      if (arr[j] < arr[minIdx]) {",
      "        minIdx = j;",
      "      }",
      "    }",
      "    if (minIdx !== i) {",
      "      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
      "    }",
      "  }",
      "  return arr;",
      "}",
    ],
  },
  insertion: {
    function: insertionSort,
    code: [
      "function insertionSort(arr) {",
      "  for (let i = 1; i < n; i++) {",
      "    let key = arr[i];",
      "    let j = i - 1;",
      "    while (j >= 0 && arr[j] > key) {",
      "      arr[j + 1] = arr[j];",
      "      j--;",
      "    }",
      "    arr[j + 1] = key;",
      "  }",
      "  return arr;",
      "}",
    ],
  },
  merge: {
    function: mergeSort,
    code: [
      "function mergeSort(arr, left, right) {",
      "  if (left < right) {",
      "    const mid = Math.floor((left + right) / 2);",
      "    mergeSort(arr, left, mid);",
      "    mergeSort(arr, mid + 1, right);",
      "    merge(arr, left, mid, right);",
      "  }",
      "}",
      "",
      "function merge(arr, left, mid, right) {",
      "  // Merge two sorted subarrays",
      "  const leftArr = arr.slice(left, mid + 1);",
      "  const rightArr = arr.slice(mid + 1, right + 1);",
      "  let i = 0, j = 0, k = left;",
      "  while (i < leftArr.length && j < rightArr.length) {",
      "    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];",
      "  }",
      "  while (i < leftArr.length) arr[k++] = leftArr[i++];",
      "  while (j < rightArr.length) arr[k++] = rightArr[j++];",
      "}",
    ],
  },
  quick: {
    function: quickSort,
    code: [
      "function quickSort(arr, low, high) {",
      "  if (low < high) {",
      "    const pi = partition(arr, low, high);",
      "    quickSort(arr, low, pi - 1);",
      "    quickSort(arr, pi + 1, high);",
      "  }",
      "}",
      "",
      "function partition(arr, low, high) {",
      "  const pivot = arr[high];",
      "  let i = low - 1;",
      "  for (let j = low; j < high; j++) {",
      "    if (arr[j] < pivot) {",
      "      i++;",
      "      [arr[i], arr[j]] = [arr[j], arr[i]];",
      "    }",
      "  }",
      "  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
      "  return i + 1;",
      "}",
    ],
  },
  heap: {
    function: heapSort,
    code: [
      "function heapSort(arr) {",
      "  const n = arr.length;",
      "  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {",
      "    heapify(arr, n, i);",
      "  }",
      "  for (let i = n - 1; i > 0; i--) {",
      "    [arr[0], arr[i]] = [arr[i], arr[0]];",
      "    heapify(arr, i, 0);",
      "  }",
      "}",
      "",
      "function heapify(arr, n, i) {",
      "  let largest = i;",
      "  const left = 2 * i + 1;",
      "  const right = 2 * i + 2;",
      "  if (left < n && arr[left] > arr[largest]) largest = left;",
      "  if (right < n && arr[right] > arr[largest]) largest = right;",
      "  if (largest !== i) {",
      "    [arr[i], arr[largest]] = [arr[largest], arr[i]];",
      "    heapify(arr, n, largest);",
      "  }",
      "}",
    ],
  },
};
