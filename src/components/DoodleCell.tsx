import "./DoodleCell.css";

import React, { ComponentClass, RefObject } from "react";

import { default as DoodleProps } from "./doodles/Props";

export interface Props {
  readonly doodleClass: ComponentClass<DoodleProps>;
  readonly onDownloadPNG: () => void;
  readonly onDownloadSVG: () => void;
  readonly svgRef?: RefObject<SVGSVGElement>;
  readonly config: DoodleProps;
}

const DoodleCell: React.FC<Props> = props => {
  const { doodleClass, onDownloadPNG, onDownloadSVG, svgRef, config } = props;
  // Notice: somehow jsx need class name to be captalized
  const DoodleClass: ComponentClass<DoodleProps> = doodleClass;

  return (
    <div className={"DoodleCell"} onClick={() => {}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 768"
        version="1.1"
        ref={svgRef}
      >
        <DoodleClass {...config} />
      </svg>
      <div className="DoodleCell-download-bar">
        <button
          className="DoodleCell-download-botton"
          onClick={() => {
            onDownloadPNG();
          }}
        >
          PNG
        </button>
        <button
          className="DoodleCell-download-botton"
          onClick={() => {
            onDownloadSVG();
          }}
        >
          SVG
        </button>
      </div>
    </div>
  );
};
export default DoodleCell;
