import { arraysAreEqual, swap } from '../helperFunctions';

export const getSelectionSortAnimations = (array) => {
    let animations  = [];
    selectionSort(array, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}

const selectionSort = (mainArray, animations) => {
    const N = mainArray.length;
    for (let i = 0; i < N - 1; i++) {
        let minIndex = i; //Finding minimum element in unsorted array
        for (let j = i + 1; j < N; j++) {
            animations.push(["comparision1", j, minIndex]);
            animations.push(["comparision2", j, minIndex]);
            if (mainArray[j] < mainArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, mainArray[i]]);
        animations.push(["swap", i, mainArray[minIndex]]);
        // Swap the found minimum element with the first element
        swap(mainArray, minIndex, i);
    }
}