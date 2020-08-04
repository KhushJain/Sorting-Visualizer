import { arraysAreEqual, swap } from '../helperFunctions';

export const getQuickSortAnimations = (array) => {
    let animations  = [];
    quickSort(array, 0, array.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}

const quickSort = (mainArray, startIndex, endIndex, animations) => {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(mainArray, startIndex, endIndex, animations);
        quickSort(mainArray, startIndex, pivotIndex - 1, animations);
        quickSort(mainArray, pivotIndex + 1, endIndex, animations);
    }
}

const partitionArray = (mainArray, startIndex, endIndex, animations) => {
    let i = startIndex - 1
    const pivotIndex = endIndex;

    for(let j = startIndex; j < endIndex; ++j) {
        animations.push(["comparision1", j, pivotIndex]);
        animations.push(["comparision2", j, pivotIndex]);
        if(mainArray[j] <= mainArray[pivotIndex]) {
            i++;
            animations.push(["swap", j, mainArray[i]]);
            animations.push(["swap", i, mainArray[j]]);
            swap(mainArray, i, j);
        }
    }

    animations.push(["swap", endIndex, mainArray[i + 1]]);
    animations.push(["swap", i + 1, mainArray[endIndex]]);
    
    swap(mainArray, i + 1, endIndex);
    return (i + 1);

}