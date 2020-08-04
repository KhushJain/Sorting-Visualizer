import { arraysAreEqual, randomIntFromInterval, swap } from '../helperFunctions';

export const getQuickSortAnimations = (array) => {
    let animations  = [];
    let auxillaryArray = array.slice();
    quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

const quickSort = (auxillaryArray, startIndex, endIndex, animations) => {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxillaryArray, startIndex, endIndex, animations);
        quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
        quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
    }
}

const partitionArray = (auxillaryArray, startIndex, endIndex, animations) => {
    let pivotIndex = randomIntFromInterval(startIndex, endIndex);
    
    animations.push(["comparision1", pivotIndex, endIndex]);
    animations.push(["swap", pivotIndex, auxillaryArray[endIndex]]);
    animations.push(["swap", endIndex, auxillaryArray[pivotIndex]]);
    animations.push(["comparision2", pivotIndex, endIndex]);
    swap(auxillaryArray, pivotIndex, endIndex);

    let lessTailIndex = startIndex;

    for(let i = startIndex; i < endIndex; ++i) {
        animations.push(["comparision1", i, endIndex]);
        animations.push(["comparision2", i, endIndex]);
        if(auxillaryArray[i] <= auxillaryArray[endIndex]) {
            animations.push(["comparision1", i, lessTailIndex]);
            animations.push(["swap", i, auxillaryArray[lessTailIndex]]);
            animations.push(["swap", lessTailIndex, auxillaryArray[i]]);
            animations.push(["comparision2", i, lessTailIndex]);
            swap(auxillaryArray, i, lessTailIndex);
            lessTailIndex++;
        }
    }
    animations.push(["comparision1", lessTailIndex, endIndex]);
    animations.push(["swap", endIndex, auxillaryArray[lessTailIndex]]);
    animations.push(["swap", lessTailIndex, auxillaryArray[endIndex]]);
    animations.push(["comparision2", lessTailIndex, endIndex]);
    
    swap(auxillaryArray, lessTailIndex, endIndex);
    return lessTailIndex;

}