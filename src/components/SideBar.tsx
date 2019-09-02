import './SideBar.css';

import { default as DoodleProps } from './doodles/Props';
import React from 'react';

export interface ColorConfig {
	readonly inkColor: string;
	readonly accentColor: string;
	readonly backgroundColor: string;
}

export interface Props {
	readonly options: Array<ColorConfig>;
	readonly selectedIndex?: number;
	readonly onSelect: (index: number) => void;
	readonly onDownloadPack: () => void;
}

const SideBar: React.FC<Props> = (props) => {
	const { options, selectedIndex, onSelect, onDownloadPack } = props;
	return (
		<div className="SideBar">
			<h1 className="SideBar-logo">Open Doodles</h1>
			<div className="SideBar-theme-container">
				<div className="SideBar-theme-header">
					<div>Theme</div>
				</div>
				{options.map((config, index) => {
					return (
						<div
							key={index}
							className="SideBar-option-block"
							style={{ ...index === selectedIndex ? { borderColor: 'black' } : {} }}
							onClick={() => onSelect(index)}
						>
							<div className="SideBar-option" style={{ backgroundColor: config.inkColor }} />
							<div className="SideBar-option" style={{ backgroundColor: config.accentColor }} />
							<div
								className={
									config.backgroundColor == '#FFFFFF00' ? (
										'SideBar-option checkerboard-bg'
									) : (
										'SideBar-option'
									)
								}
								style={{ backgroundColor: config.backgroundColor }}
							/>
						</div>
					);
				})}
			</div>
			<a href="#" className="SideBar-button SideBar-w-button" onClick={onDownloadPack}>
				Download Pack
			</a>
			<div className="SideBar-source-block">
				<a href="#">
					<svg
						className="logo"
						width="22px"
						height="22px"
						viewBox="0 0 22 22"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="Web-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Desktop-HD" transform="translate(-24.000000, -550.000000)">
								<g id="Source-FIles" transform="translate(24.000000, 549.000000)">
									<g id="Group" transform="translate(0.000000, 1.000000)">
										<g id="Studio-Logo">
											<rect id="Rectangle" fill="#FF4183" x="0" y="0" width="22" height="22" />
											<rect
												id="Rectangle"
												fill="#FFFFFF"
												x="12.1"
												y="12.1"
												width="5.5"
												height="5.5"
											/>
										</g>
									</g>
								</g>
							</g>
						</g>
					</svg>
					Studio
				</a>
				<a href="#">
					<img className="logo" src="sketch-logo.png" />
					Sketch
				</a>
			</div>
		</div>
	);
};
export default SideBar;
