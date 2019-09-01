import React, { ComponentClass, useRef } from 'react';

import { default as DoodleProps } from './doodles/Props';

export interface Props {
	readonly doodleClass: ComponentClass<DoodleProps>;
	readonly onDownloadPNG: (svgRef: SVGSVGElement) => void;
	readonly config: DoodleProps;
}

const DoodleCell: React.FC<Props> = (props) => {
	const { doodleClass, onDownloadPNG, config } = props;
	// Notice: somehow jsx need class name to be captalized
	const DoodleClass: ComponentClass<DoodleProps> = doodleClass;
	const doodleRef = useRef(null);
	return (
		<div
			key={doodleClass.name}
			onClick={() => {
				onDownloadPNG(doodleRef.current!);
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="400px"
				height="300px"
				viewBox="0 0 1024 768"
				version="1.1"
				ref={doodleRef}
			>
				<DoodleClass {...config} />
			</svg>
		</div>
	);
};
export default DoodleCell;
