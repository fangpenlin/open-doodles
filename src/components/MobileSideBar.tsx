import "./MobileSideBar.css";

import { ColorConfig } from "./SideBar";
import React from "react";

export interface Props {
  readonly options: Array<ColorConfig>;
  readonly selectedIndex?: number;
  readonly onSelect: (index: number) => void;
  readonly onDownloadPack: () => void;
}

const MobileSideBar: React.FC<Props> = props => {
  const { options, selectedIndex, onSelect, onDownloadPack } = props;
  return (
    <div className="MobileSideBar">
      <div className="MobileSideBar-theme-container">
        <div className="MobileSideBar-theme-header">
          <div>Choose a theme</div>
        </div>
        <div className="MobileSideBar-theme-grid">
          {options.map((config, index) => {
            return (
              <div
                key={index}
                className="MobileSideBar-option-block"
                style={{
                  ...(index === selectedIndex ? { borderColor: "black" } : {})
                }}
                onClick={() => onSelect(index)}
              >
                <div
                  className="MobileSideBar-option"
                  style={{ backgroundColor: config.inkColor }}
                />
                <div
                  className="MobileSideBar-option"
                  style={{ backgroundColor: config.accentColor }}
                />
                <div
                  className={
                    config.backgroundColor === "#FFFFFF00"
                      ? "MobileSideBar-option checkerboard-bg"
                      : "MobileSideBar-option"
                  }
                  style={{ backgroundColor: config.backgroundColor }}
                />
              </div>
            );
          })}
        </div>
        <button
          className="MobileSideBar-button MobileSideBar-w-button"
          onClick={event => {
            onDownloadPack();
            event.preventDefault();
          }}
        >
          Download Pack
        </button>
      </div>
    </div>
  );
};
export default MobileSideBar;
