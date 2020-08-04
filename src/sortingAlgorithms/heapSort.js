import { arraysAreEqual, swap } from '../helperFunctions';

export const getHeapSortAnimations = (array) => {
    let animations  = [];
    heapSort(array, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}

const heapSort = (mainArray, animations) => {
    const N = mainArray.length;

    // Build a maxheap
    for (let i = Math.floor(N/2) - 1; i > -1; --i) {
        heapify(mainArray, N, i, animations);
    }

    // One by one extract elements 
    for (let i = N - 1; i > 0; --i) {
        animations.push(["swap", i, mainArray[0]]);
        animations.push(["swap", 0, mainArray[i]]);
        swap(mainArray, i, 0);
        heapify(mainArray, i, 0, animations);
    }
}

const heapify = (mainArray, N, i, animations) => {
    let largest = i       // Initialize largest as root 
    const l = 2 * i + 1     // left = 2*i + 1 
    const r = 2 * i + 2     // right = 2*i + 2 
  
    // See if left child of root exists and is greater than root
    if (l < N && mainArray[i] < mainArray[l]) {
        animations.push(["comparision1", i, l]);
        animations.push(["comparision2", i, l]);
        largest = l 
    }

    // See if right child of root exists and is greater than root
    if (r < N && mainArray[largest] < mainArray[r]) {
        animations.push(["comparision1", r, largest]);
        animations.push(["comparision2", r, largest]); 
        largest = r 
    }

  
    // Change root, if needed 
    if (largest !== i) {
        animations.push(["swap", i, mainArray[largest]]);
        animations.push(["swap", largest, mainArray[i]]);
        swap(mainArray, i, largest)

        // Heapify the root. 
        heapify(mainArray, N, largest, animations)
    } 
}  