import './App.css';

import * as FileSaver from 'file-saver';
import * as ReactDOM from 'react-dom';

import React, { ComponentClass, createRef, useRef, useState } from 'react';
import SideBar, { ColorConfig } from './SideBar';

import BikiniDoodle from './doodles/BikiniDoodle';
import DancingDoodle from './doodles/DancingDoodle';
import DoodleCell from './DoodleCell';
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
	readonly selectedIndex?: number;
	readonly customColor?: ColorConfig;
}

function triggerDownload(imageBlob: Blob, fileName: string) {
	FileSaver.saveAs(imageBlob, fileName);
}

function downloadPNG(args: { canvasRef: HTMLCanvasElement; svgRef: SVGSVGElement }) {
	const { canvasRef, svgRef: doodleRef } = args;
	const svgNode: HTMLElement = ReactDOM.findDOMNode(doodleRef) as HTMLElement;
	const canvas = canvasRef;
	const ctx = canvas.getContext('2d')!;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const anyWindow = window as any;
	const DOMURL = anyWindow.URL || anyWindow.webkitURL || window;

	const data = svgNode.outerHTML;
	const img = new Image();
	const svg = new Blob([ data ], { type: 'image/svg+xml' });
	const url = DOMURL.createObjectURL(svg);

	const svgWidth = parseInt(svgNode.getAttribute('width')!);
	const svgHeight = parseInt(svgNode.getAttribute('height')!);

	img.onload = () => {
		ctx.save();
		ctx.scale(canvas.width / svgWidth, canvas.height / svgHeight);
		ctx.drawImage(img, 0, 0);
		ctx.restore();
		DOMURL.revokeObjectURL(url);
		canvasRef.toBlob((imageBlob) => {
			triggerDownload(imageBlob!, 'doodle.png');
		});
	};
	img.src = url;
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
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const doodleRefs = useRef<Array<{ current: SVGSVGElement | null }>>(doodles.map(() => createRef<SVGSVGElement>()));
	return (
		<div className="App">
			<SideBar options={options} onSelect={onSelectOption} selectedIndex={selectedIndex} />
			<div
				className="section-2"
				style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', backgroundColor }}
			>
				{doodles.map((doodleClass) => {
					return (
						<DoodleCell
							key={doodleClass.name}
							doodleClass={doodleClass}
							onDownloadPNG={(svgRef) => {
								downloadPNG({
									canvasRef: canvasRef.current!,
									svgRef
								});
							}}
							onDownloadSVG={(svgRef) => {
								// TODO:
							}}
							config={config}
						/>
					);
				})}
			</div>
			<canvas ref={canvasRef} style={{ display: 'none' }} width="1024" height="768" />
		</div>
	);
};

export default App;
