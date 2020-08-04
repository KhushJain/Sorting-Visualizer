import { arraysAreEqual } from '../helperFunctions';

export const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log(arraysAreEqual(javaScriptSortedArray, array));
  return [animations, array];
}

const mergeSortHelper = ( mainArray, startIdx, endIdx, auxiliaryArray, animations, ) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

const doMerge = ( mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, ) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["comparision1", i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push(["comparision2", i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push(["overwrite", k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push(["overwrite", k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["comparision1", i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push(["comparision2", i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push(["overwrite", k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["comparision1", j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push(["comparision2", j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push(["overwrite", k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}