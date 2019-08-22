import './App.css';

import Doodle from './doodles/GroovySittingDoodle';
import React from 'react';
import logo from './logo.svg';

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
				<div style={{ backgroundColor: 'white' }}>
					<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
						<Doodle inkColor="#000000" accentColor="#CF536D" />
					</svg>
				</div>
			</header>
		</div>
	);
};

export default App;
