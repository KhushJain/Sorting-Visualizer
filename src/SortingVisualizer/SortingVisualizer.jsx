import React, { Component } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import './SortingVisualizer.css';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      NUMBER_OF_ARRAY_BARS: 250,
      ANIMATION_SPEED_MS: 2,
      width: 2
    };
  }

  componentDidMount() {
    this.resetArray(this.state.NUMBER_OF_ARRAY_BARS);
  }

  resetArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({array});
    let numWidth = Math.floor(window.innerWidth / ( array.length * 3));
    if (numWidth < 2) {
      numWidth = 2;
    }
    if (numWidth > 15) {
      this.setState({ ANIMATION_SPEED_MS: 30 });
    } else if (numWidth > 10) {
      this.setState({ ANIMATION_SPEED_MS: 20 });
    } else if (numWidth > 3) {
      this.setState({ ANIMATION_SPEED_MS: 10 });
    } else {
      this.setState({ ANIMATION_SPEED_MS: 2 });
    }
    this.setState({ width: numWidth });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.ANIMATION_SPEED_MS);
      }
    }
  }

  // quickSort() {
    
  // }

  // heapSort() {

  // }

  // bubbleSort() {

  // }

  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     //const javaScriptSortedArray = array.slice().sort((a, b) => a - b);

  //     // For Merge Sort
  //     // const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     // console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));

  //     // For Quick Sort
  //     // const quickSortedArray = getQuickSortAnimations(array.slice());
  //     // console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
  //   }
  // }

  render() {
    const {array} = this.state;

    return (
      <>
        <p className="range-field" style={{ display: 'inline-block', width: '25%', marginRight: '20px' }}>
          <label style={{ marginRight: '10px' }}>Array Size: </label>
          <input value={this.state.NUMBER_OF_ARRAY_BARS} type="range" id="test5" min="10" max="300" onChange={(e) => { this.setState({ NUMBER_OF_ARRAY_BARS: e.target.value }); this.resetArray(e.target.value); }} />
          <button style={{ marginRight: '20px' }} onClick={() => this.resetArray(this.state.NUMBER_OF_ARRAY_BARS)}>Generate New Array</button>
          <button style={{ marginRight: '20px' }} onClick={() => this.mergeSort()}>Merge Sort</button>
          {/* <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button> */}
          {/* <button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button> */}
        </p>
        <br /><br />
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${this.state.width}px`
              }}></div>
          ))}
        </div>
      </>
    );
  }
}


const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }