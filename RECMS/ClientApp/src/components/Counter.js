import React, { useState, useContext } from 'react';

export function Counter() {

    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    }

    const decrease = () => {
        setCount(count - 1);
    }

    return (
        <div> 
            <h1> this looks like it is working </h1>
            <p> {count}</p>
            <button onClick={increase}> Click to Increase </button>
            <button onClick={decrease}> Click to Decrease </button>
            
        </div>
       
        );

}

/*export default Counter;*/



//export class Counter extends Component {
//  static displayName = Counter.name; 

//  constructor(props) {
//    super(props);
//    this.state = { currentCount: 0 };
//    this.incrementCounter = this.incrementCounter.bind(this);
//  }

//  incrementCounter() {
//    this.setState({
//      currentCount: this.state.currentCount + 1
//    });
//  }

//  render() {
//    return (
//      <div>
//        <h1>Counter</h1>

//        <p>This is a simple example of a React component.</p>

//        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

//        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
//      </div>
//    );
//  }
//}
