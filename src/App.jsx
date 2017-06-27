import React from 'react';
import ReactDOM from 'react-dom';

// import { createStore } from './redux';
import { createStore } from 'redux';


const initialState = { count: 0 };


function reducer(state = { count: 0 }, action){
	switch(action.type) {
		case 'INC': return { count: state.count + action.amount};
		case 'DEC': return { count: state.count - action.amount};
		case 'RES': return { count: 0};
		default: return state;
	}
}



function increment(amount){
	return { type: 'INC', amount}
};

function decrement(amount){
	return { type: 'DEC', amount}
};

function reset(){
	return { type: 'RES' }
};

const store = new createStore(reducer, initialState);

class Counter extends React.Component {
	constructor(props){
		super(props);
	
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);

	}

	componentDidMount() {
		store.subscribe( () => this.forceUpdate());
	}

	increment(){
		let amount = parseInt(this.refs.amount.value || 1 );
		store.dispatch(increment(amount));
	}

	decrement(){
		let amount = parseInt(this.refs.amount.value || 1 );
		store.dispatch(decrement(amount));
	}
	reset(){
		store.dispatch(reset());
	}

	render(){
		const count = store.getState().count;
		return (
			<div className='counter'>
				<span className='count'>{count}</span>

				<div>
				    <button className='reset' onClick={this.reset}>0</button>
					<button className='increment' onClick={this.increment}>+</button>
					<button className='increment' onClick={this.decrement}>-</button>				
				</div>

				<input type='text' ref='amount' defaultValue='1'/>
			</div>
		)
	}
}

ReactDOM.render(<Counter />, document.getElementById('root'));