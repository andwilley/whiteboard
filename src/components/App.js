import React, { Component } from 'react';
import '../style/App.css';

class App extends Component {
	constructor(props) {
		super(props);
	}
	
	sum(x,y) {
		return x+y;
	}
	
	render() {
		return (
			<div className="myApp">
			</div>
		);
	}
}

export default App;