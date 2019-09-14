import "./SideBar.css";

import GlyphCode from "./icons/GlyphCode";
import GlyphColor from "./icons/GlyphColor";
import React from "react";
import StudioLogo from "./icons/StudioLogo";

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

const SideBar: React.FC<Props> = props => {
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
              style={{
                ...(index === selectedIndex ? { borderColor: "black" } : {})
              }}
              onClick={() => onSelect(index)}
            >
              <div
                className="SideBar-option"
                style={{ backgroundColor: config.inkColor }}
              />
              <div
                className="SideBar-option"
                style={{ backgroundColor: config.accentColor }}
              />
              <div
                className={
                  config.backgroundColor === "#FFFFFF00"
                    ? "SideBar-option checkerboard-bg"
                    : "SideBar-option"
                }
                style={{ backgroundColor: config.backgroundColor }}
              />
            </div>
          );
        })}
        <button
          className="SideBar-button SideBar-w-button"
          onClick={event => {
            onDownloadPack();
            event.preventDefault();
          }}
        >
          Download Pack
        </button>
        <div className="SideBar-source-block">
          <a href="#">
            <StudioLogo />
            Studio File
          </a>
          <a href="#">
            <img className="logo" src="sketch-logo.png" />
            Sketch File
          </a>
        </div>
      </div>
      <div className="SideBar-author-block">
        <a href="https://twitter.com/pablostanley">
          <GlyphColor /> Pablo Stanley
        </a>
        <a href="https://twitter.com/fangpenlin">
          <GlyphCode /> Fang-Pen Lin
        </a>
      </div>
    </div>
  );
};
export default SideBar;
