import './App.css';

import React, { ComponentClass, useState } from 'react';
import SideBar, { ColorConfig } from './SideBar';

import BikiniDoodle from './doodles/BikiniDoodle';
import DancingDoodle from './doodles/DancingDoodle';
import { default as DoodleProps } from './doodles/Props';
import GroovySittingDoodle from './doodles/GroovySittingDoodle';
import IceCreamDoodle from './doodles/IceCreamDoodle';
import JumpingDoodle from './doodles/JumpingDoodle';
import LovingDoodle from './doodles/LovingDoodle';
import MeditatingDoodle from './doodles/MeditatingDoodle';
import MoshingDoodle from './doodles/MoshingDoodle';
import PettingDoodle from './doodles/PettingDoodle';
import ReadingDoodle from './doodles/ReadingDoodle';
import RollerSkatingDoodle from './doodles/RollerSkatingDoodle';
import RollingDoodle from './doodles/RollingDoodle';
import RunningDoodle from './doodles/RunningDoodle';
import SelfieDoodle from './doodles/SelfieDoodle';
import SittingDoodle from './doodles/SittingDoodle';
import SprintingDoodle from './doodles/SprintingDoodle';
import StrollingDoodle from './doodles/StrollingDoodle';
import SwingingDoodle from './doodles/SwingingDoodle';
import UnboxingDoodle from './doodles/UnboxingDoodle';
import ZombieingDoodle from './doodles/ZombieingDoodle';

const options: Array<ColorConfig> = [
	{
		inkColor: '#000000',
		accentColor: '#CF536D',
		backgroundColor: '#FFFFFF00'
	},
	{
		inkColor: '#000000',
		accentColor: 'blue',
		backgroundColor: '#FFFFFF00'
	},
	{
		inkColor: '#000000',
		accentColor: '#CF536D',
		backgroundColor: 'green'
	}
];

interface State {
	selectedIndex?: number;
	customColor?: ColorConfig;
}

const App: React.FC = () => {
	const [ state, setState ] = useState<State>({
		selectedIndex: 1
	});
	// TODO: maybe need to use useCallback to memorize this?
	const onSelectOption = (selectedIndex: number) => {
		setState((oldStatus: State) => ({
			...oldStatus,
			selectedIndex
		}));
	};
	const { selectedIndex, customColor } = state;
	const config: ColorConfig = selectedIndex !== undefined ? options[selectedIndex] : customColor!;
	const { backgroundColor } = config;
	const doodles: Array<ComponentClass<DoodleProps>> = [
		BikiniDoodle,
		SprintingDoodle,
		MoshingDoodle,
		MeditatingDoodle,
		GroovySittingDoodle,
		SwingingDoodle,
		ZombieingDoodle,
		UnboxingDoodle,
		DancingDoodle,
		StrollingDoodle,
		RollingDoodle,
		RollerSkatingDoodle,
		JumpingDoodle,
		SittingDoodle,
		SelfieDoodle,
		IceCreamDoodle,
		ReadingDoodle,
		RunningDoodle,
		LovingDoodle,
		PettingDoodle
	];
	return (
		<div className="App">
			<SideBar options={options} onSelect={onSelectOption} selectedIndex={selectedIndex} />
			<div
				className="section-2"
				style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', backgroundColor }}
			>
				{doodles.map((DoodleCls) => {
					return (
						<svg key={DoodleCls.name} width="400px" height="300px" viewBox="0 0 1024 768" version="1.1">
							<DoodleCls {...config} />
						</svg>
					);
				})}
			</div>
		</div>
	);
};

export default App;
