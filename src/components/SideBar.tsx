import { default as DoodleProps } from './doodles/Props';
import React from 'react';

export interface ColorConfig {
	inkColor: string;
	accentColor: string;
	backgroundColor: string;
}

export interface Props {
	options: Array<ColorConfig>;
	selectedIndex?: number;
	onSelect: (index: number) => void;
}

const SideBar: React.FC<Props> = (props) => {
	const { options, selectedIndex, onSelect } = props;
	return (
		<div className="sidebar">
			<h1 className="logo">Open Doodles</h1>
			<div className="div-block-4">
				<div className="div-block-5">
					ex
					<div>Theme</div>
					<a href="#">New</a>
				</div>
				{options.map((config, index) => {
					return (
						<div
							key={index}
							className="div-block-2"
							style={{ ...index === selectedIndex ? { backgroundColor: '#f5f5f5' } : {} }}
							onClick={() => onSelect(index)}
						>
							<div className="div-block" style={{ backgroundColor: config.inkColor }} />
							<div className="div-block" style={{ backgroundColor: config.accentColor }} />
							<div className="div-block" style={{ backgroundColor: config.backgroundColor }} />
						</div>
					);
				})}
			</div>
			<a href="#" className="button w-button">
				Download Pack
			</a>
			<div className="div-block-3">
				<a href="#">Studio File</a>
				<a href="#">Sketch File</a>
			</div>
		</div>
	);
};
export default SideBar;
