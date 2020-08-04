import { arraysAreEqual, swap } from '../helperFunctions';

export const getBubbleSortAnimations = (array) => {
    let animations  = [];
    bubbleSort(array, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, array));
    return [animations, array];
}

const bubbleSort = (mainArray, animations) => {
    const N = mainArray.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["comparision1", i, i + 1]);
            animations.push(["comparision2", i, i + 1]);
            if(mainArray[i] > mainArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, mainArray[i + 1]]);
                animations.push(["swap", i + 1, mainArray[i]]);
                swap(mainArray, i, i + 1);
            }
        }
        if(swapped === false) break;
        iters--;
    }
}