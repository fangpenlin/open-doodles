import "./SideBar.css";

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
      </div>
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
          Studio
        </a>
        <a href="#">
          <img className="logo" src="sketch-logo.png" />
          Sketch
        </a>
      </div>
      <div className="SideBar-author-block">
        <a href="https://twitter.com/fangpenlin">
          <svg
            className="icon"
            width="14px"
            height="12px"
            viewBox="0 0 14 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Web-App"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Desktop-HD"
                transform="translate(-25.000000, -961.000000)"
                fill="#000000"
              >
                <g id="Credit" transform="translate(24.000000, 955.000000)">
                  <g id="glyph/code" transform="translate(0.000000, 2.000000)">
                    <path
                      d="M6.26666667,11.0666667 L3.2,8 L6.26666667,4.93333333 L5.33333333,4 L1.33333333,8 L5.33333333,12 L6.26666667,11.0666667 Z M9.73333333,11.0666667 L12.8,8 L9.73333333,4.93333333 L10.6666667,4 L14.6666667,8 L10.6666667,12 L9.73333333,11.0666667 L9.73333333,11.0666667 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          Fang-Pen Lin
        </a>
        <a href="https://twitter.com/pablostanley">
          <svg
            className="icon"
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Web-App"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Desktop-HD"
                transform="translate(-26.000000, -985.000000)"
                fill="#000000"
              >
                <g id="Credit" transform="translate(24.000000, 955.000000)">
                  <g
                    id="glyph/color"
                    transform="translate(0.000000, 28.000000)"
                  >
                    <path
                      d="M8,2 C4.68666667,2 2,4.68666667 2,8 C2,11.3133333 4.68666667,14 8,14 C8.55333333,14 9,13.5533333 9,13 C9,12.74 8.9,12.5066667 8.74,12.3266667 C8.58666667,12.1533333 8.48666667,11.92 8.48666667,11.6666667 C8.48666667,11.1133333 8.93333333,10.6666667 9.48666667,10.6666667 L10.6666667,10.6666667 C12.5066667,10.6666667 14,9.17333333 14,7.33333333 C14,4.38666667 11.3133333,2 8,2 Z M4.33333333,8 C3.78,8 3.33333333,7.55333333 3.33333333,7 C3.33333333,6.44666667 3.78,6 4.33333333,6 C4.88666667,6 5.33333333,6.44666667 5.33333333,7 C5.33333333,7.55333333 4.88666667,8 4.33333333,8 Z M6.33333333,5.33333333 C5.78,5.33333333 5.33333333,4.88666667 5.33333333,4.33333333 C5.33333333,3.78 5.78,3.33333333 6.33333333,3.33333333 C6.88666667,3.33333333 7.33333333,3.78 7.33333333,4.33333333 C7.33333333,4.88666667 6.88666667,5.33333333 6.33333333,5.33333333 Z M9.66666667,5.33333333 C9.11333333,5.33333333 8.66666667,4.88666667 8.66666667,4.33333333 C8.66666667,3.78 9.11333333,3.33333333 9.66666667,3.33333333 C10.22,3.33333333 10.6666667,3.78 10.6666667,4.33333333 C10.6666667,4.88666667 10.22,5.33333333 9.66666667,5.33333333 Z M11.6666667,8 C11.1133333,8 10.6666667,7.55333333 10.6666667,7 C10.6666667,6.44666667 11.1133333,6 11.6666667,6 C12.22,6 12.6666667,6.44666667 12.6666667,7 C12.6666667,7.55333333 12.22,8 11.6666667,8 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          Pablo Stanley
        </a>
      </div>
    </div>
  );
};
export default SideBar;
