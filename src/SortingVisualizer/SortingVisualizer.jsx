import React, { Component } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort';
import { getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';
import './SortingVisualizer.css';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const algorithms = {
  "mergeSort": getMergeSortAnimations,
  "insertionSort": getInsertionSortAnimations,
  "quickSort": getQuickSortAnimations,
  "selectionSort": getSelectionSortAnimations,
  "bubbleSort": getBubbleSortAnimations,
}

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
    this.restoreStoreButtons();
  }

  disableSortButtons() {
    document.getElementById("test5").disabled = true;

    document.getElementById("mergeSort").disabled = true;
    let buttonStyle = document.getElementById("mergeSort").style;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("quickSort").disabled = true;
    buttonStyle = document.getElementById("quickSort").style;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("insertionSort").disabled = true;
    buttonStyle = document.getElementById("insertionSort").style;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("selectionSort").disabled = true;
    buttonStyle = document.getElementById("selectionSort").style;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("bubbleSort").disabled = true;
    buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";
}
restoreStoreButtons() {
    document.getElementById("test5").disabled = false;

    document.getElementById("mergeSort").disabled = false;
    let buttonStyle = document.getElementById("mergeSort").style;
    buttonStyle.background = "#1abc9c";
    buttonStyle.cursor = "pointer";

    document.getElementById("quickSort").disabled = false;
    buttonStyle = document.getElementById("quickSort").style;
    buttonStyle.background = "#1abc9c";
    buttonStyle.cursor = "pointer";

    document.getElementById("bubbleSort").disabled = false;
    buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.background = "#1abc9c";
    buttonStyle.cursor = "pointer";

    document.getElementById("selectionSort").disabled = false;
    buttonStyle = document.getElementById("selectionSort").style;
    buttonStyle.background = "#1abc9c";
    buttonStyle.cursor = "pointer";

    document.getElementById("insertionSort").disabled = false;
    buttonStyle = document.getElementById("insertionSort").style;
    buttonStyle.background = "#1abc9c";
    buttonStyle.cursor = "pointer";
}

  sort(algorithmName) {
    this.disableSortButtons();
    const [animations, ] = algorithms[algorithmName](this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const [ , barOneIndex, barTwoIndex] = animations[i];
            const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;

            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * this.state.ANIMATION_SPEED_MS);
            
        }
        else {
            setTimeout(() => {
                const [ , barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              },i * this.state.ANIMATION_SPEED_MS);
        }
    }
    const RESTORE_TIME = parseInt(this.state.ANIMATION_SPEED_MS*animations.length/2 + 3500);
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
  }

  render() {
    const {array} = this.state;

    return (
      <>
        <p className="range-field" style={{ display: 'inline-block', width: '25%', marginRight: '20px' }}>
          <label style={{ marginRight: '10px' }}>Array Size: </label>
          <input value={this.state.NUMBER_OF_ARRAY_BARS} type="range" id="test5" min="10" max="300" onChange={(e) => { this.setState({ NUMBER_OF_ARRAY_BARS: e.target.value }); this.resetArray(e.target.value); }} />
        </p>
        <button className="custombtn second" style={{ marginRight: '20px' }} onClick={() => this.resetArray(this.state.NUMBER_OF_ARRAY_BARS)}>Generate New Array</button>
        <button className="custombtn second" id="mergeSort" style={{ marginRight: '20px' }} onClick={() => this.sort('mergeSort')}>Merge Sort</button>
        <button className="custombtn second" id="quickSort" style={{ marginRight: '20px' }} onClick={() => this.sort('quickSort')}>Quick Sort</button>
        <button className="custombtn second" id="bubbleSort" style={{ marginRight: '20px' }} onClick={() => this.sort('bubbleSort')}>Bubble Sort</button>
        <button className="custombtn second" id="selectionSort" style={{ marginRight: '20px' }} onClick={() => this.sort('selectionSort')}>Selection Sort</button>
        <button className="custombtn second" id="insertionSort" style={{ marginRight: '20px' }} onClick={() => this.sort('insertionSort')}>Insertion Sort</button>        
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
