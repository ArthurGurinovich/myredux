function updateState(state, action){
	if(action.type === 'INC'){
		return { count: state.count + action.amount };
	} else if(action.type === 'DEC'){
		return { count: state.count - action.amount };
	} else{
		return state;
	}
}

class Store {
	constructor(updateState, state){
		this._updateState = updateState;
		this._state = state;	
		this._callbacks = [];
	}

	get state(){
		return this._state;
	}

	update(action){
		this._state = this._updateState(this._state, action);
		this._callbacks.forEach(callback => callback());
	}

	subscribe(callback){
		this._callbacks.push(callback);
		return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
	}
}

const initialState = { count: 0 };

const store = new Store(updateState, initialState);

const incAction = { type: 'INC', amount: 5 };
const decAction = { type: 'DEC', amount: 3 };


const unsubscribe = store.subscribe( () => console.log('State changed 1:', store.state));
store.subscribe( () => console.log('State changed to Search 2:', store.state));
store.update(incAction);
unsubscribe();
store.update(decAction);
store.update({});

