import { arraysAreEqual, randomIntFromInterval, swap } from '../helperFunctions';

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
    let pivotIndex = randomIntFromInterval(startIndex, endIndex);
    
    animations.push(["comparision1", pivotIndex, endIndex]);
    animations.push(["swap", pivotIndex, mainArray[endIndex]]);
    animations.push(["swap", endIndex, mainArray[pivotIndex]]);
    animations.push(["comparision2", pivotIndex, endIndex]);
    swap(mainArray, pivotIndex, endIndex);

    let lessTailIndex = startIndex;

    for(let i = startIndex; i < endIndex; ++i) {
        animations.push(["comparision1", i, endIndex]);
        animations.push(["comparision2", i, endIndex]);
        if(mainArray[i] <= mainArray[endIndex]) {
            animations.push(["comparision1", i, lessTailIndex]);
            animations.push(["swap", i, mainArray[lessTailIndex]]);
            animations.push(["swap", lessTailIndex, mainArray[i]]);
            animations.push(["comparision2", i, lessTailIndex]);
            swap(mainArray, i, lessTailIndex);
            lessTailIndex++;
        }
    }
    animations.push(["comparision1", lessTailIndex, endIndex]);
    animations.push(["swap", endIndex, mainArray[lessTailIndex]]);
    animations.push(["swap", lessTailIndex, mainArray[endIndex]]);
    animations.push(["comparision2", lessTailIndex, endIndex]);
    
    swap(mainArray, lessTailIndex, endIndex);
    return lessTailIndex;

}