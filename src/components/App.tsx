import './App.css';

import React, { useState } from 'react';

import BikiniDoodle from './doodles/BikiniDoodle';
import DoodleEditor from './DoodleEditor';
import { default as DoodleProps } from './doodles/Props';
import GroovySittingDoodle from './doodles/GroovySittingDoodle';
import JumpingDoodle from './doodles/JumpingDoodle';
import MeditatingDoodle from './doodles/MeditatingDoodle';
import MoshingDoodle from './doodles/MoshingDoodle';
import SprintingDoodle from './doodles/SprintingDoodle';
import SwingingDoodle from './doodles/SwingingDoodle';

const App: React.FC = () => {
	const [ doodleState, setDoodleState ] = useState<DoodleProps>({
		inkColor: '#000000',
		accentColor: '#CF536D'
	});
	// TODO: maybe need to use useCallback to memorize this?
	const onInkColorUpdate = (color: string) => {
		setDoodleState((oldStatus: DoodleProps) => ({
			...oldStatus,
			inkColor: color
		}));
	};
	const onAccentColorUpdate = (color: string) => {
		setDoodleState((oldStatus: DoodleProps) => ({
			...oldStatus,
			accentColor: color
		}));
	};
	return (
		<div className="App">
			<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<BikiniDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<SprintingDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<MoshingDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<MeditatingDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<GroovySittingDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<SwingingDoodle {...doodleState} />
				</svg>
				<svg width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
					<JumpingDoodle {...doodleState} />
				</svg>
			</div>
			<DoodleEditor {...{ ...doodleState, onInkColorUpdate, onAccentColorUpdate }} />
		</div>
	);
};

export default App;
