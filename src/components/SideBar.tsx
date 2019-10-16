import "./SideBar.css";

import React from "react";

export interface ColorConfig {
  readonly inkColor: string;
  readonly accentColor: string;
  readonly backgroundColor: string;
}

export interface Props {
  readonly options: Array<ColorConfig>;
  readonly optionIndex?: number;
  readonly tabIndex: number;
  readonly onSelectTab: (index: number) => void;
  readonly onSelectOption: (index: number) => void;
  readonly onDownloadPack: () => void;
}

const SideBar: React.FC<Props> = props => {
  const {
    options,
    optionIndex,
    tabIndex,
    onSelectOption,
    onSelectTab,
    onDownloadPack
  } = props;
  return (
    <div className="SideBar">
      <h1 className="SideBar-logo">Open Doodles</h1>
      <div className="SideBar-theme-container">
        <div className="SideBar-theme-header">
          <div className="SideBar-tabs-menu">
            <a
              href="#"
              className={
                "SideBar-tab SideBar-link" +
                (tabIndex === 0 ? " SideBar-tab-current" : "")
              }
              onClick={() => {
                onSelectTab(0);
                return false;
              }}
            >
              <div>Theme</div>
            </a>
            <a
              href="#"
              className={
                "SideBar-tab SideBar-link" +
                (tabIndex === 1 ? " SideBar-tab-current" : "")
              }
              onClick={() => {
                onSelectTab(1);
                return false;
              }}
            >
              <div>Create</div>
            </a>
          </div>
        </div>
        <div
          className="SideBar-theme-grid"
          style={{
            ...(tabIndex !== 0 ? { display: "none" } : {})
          }}
        >
          {options.map((config, index) => {
            return (
              <div
                key={index}
                className="SideBar-option-block"
                style={{
                  ...(index === optionIndex ? { borderColor: "black" } : {})
                }}
                onClick={() => onSelectOption(index)}
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
        <div
          className="SideBar-color-picker"
          style={{
            ...(tabIndex !== 1 ? { display: "none" } : {})
          }}
        >
          <div className="form-block-2 w-form">
            <form name="email-form" data-name="Email Form">
              <div className="SideBar-color-picker-input-row">
                <label htmlFor="ink" className="SideBar-color-picker-label">
                  Ink
                </label>
                <a href="#" className="SideBar-color-picker-button"></a>
                <input
                  type="text"
                  className="SideBar-color-picker-field"
                  name="ink"
                  placeholder="#000000"
                />
              </div>
              <div className="SideBar-color-picker-input-row">
                <label htmlFor="accent" className="SideBar-color-picker-label">
                  Accent
                </label>
                <a href="#" className="SideBar-color-picker-button"></a>
                <input
                  type="text"
                  className="SideBar-color-picker-field"
                  name="accent"
                  placeholder="#cf536d"
                />
              </div>
              <div className="SideBar-color-picker-input-row">
                <label
                  htmlFor="background"
                  className="SideBar-color-picker-label"
                >
                  Background
                </label>
                <a href="#" className="SideBar-color-picker-button"></a>
                <input
                  type="text"
                  className="SideBar-color-picker-field"
                  name="background"
                />
              </div>
            </form>
          </div>
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
      </div>
      <div className="SideBar-author-block">
        <a href="https://twitter.com/pablostanley">
          <img src="icon-design.svg" alt="Design icon" />
          <span className="link">Pablo Stanley</span>
        </a>
        <a href="https://twitter.com/fangpenlin">
          <img src="icon-code.svg" alt="Code icon" />
          <span className="link">Fang-Pen Lin</span>
        </a>
      </div>
    </div>
  );
};
export default SideBar;
