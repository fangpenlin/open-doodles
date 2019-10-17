import "./SideBar.css";

import ColorPicker from "./ColorPicker";
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
  readonly customConfig: ColorConfig;
  readonly onSelectTab: (index: number) => void;
  readonly onSelectOption: (index: number) => void;
  readonly onCustomConfigChange: (customConfig: ColorConfig) => void;
  readonly onDownloadPack: () => void;
}

const SideBar: React.FC<Props> = props => {
  const {
    options,
    optionIndex,
    tabIndex,
    customConfig,
    onSelectOption,
    onSelectTab,
    onCustomConfigChange,
    onDownloadPack
  } = props;
  return (
    <div className="SideBar">
      <h1 className="SideBar-logo">
        <a href="https://opendoodles.com">Open Doodles</a>
      </h1>
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
        <div className="SideBar-tab-container">
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
                  <ColorPicker
                    color={customConfig.inkColor}
                    onChange={color => {
                      onCustomConfigChange({
                        ...customConfig,
                        inkColor: color
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="SideBar-color-picker-field"
                    name="ink"
                    placeholder="#000000"
                    value={customConfig.inkColor}
                    onChange={event => {
                      onCustomConfigChange({
                        ...customConfig,
                        inkColor: event.target.value
                      });
                    }}
                  />
                </div>
                <div className="SideBar-color-picker-input-row">
                  <label
                    htmlFor="accent"
                    className="SideBar-color-picker-label"
                  >
                    Accent
                  </label>
                  <ColorPicker
                    color={customConfig.accentColor}
                    onChange={color => {
                      onCustomConfigChange({
                        ...customConfig,
                        accentColor: color
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="SideBar-color-picker-field"
                    name="accent"
                    placeholder="#cf536d"
                    value={customConfig.accentColor}
                    onChange={event => {
                      onCustomConfigChange({
                        ...customConfig,
                        accentColor: event.target.value
                      });
                    }}
                  />
                </div>
                <div className="SideBar-color-picker-input-row">
                  <label
                    htmlFor="background"
                    className="SideBar-color-picker-label"
                  >
                    Background
                  </label>
                  <ColorPicker
                    color={customConfig.backgroundColor}
                    onChange={color => {
                      onCustomConfigChange({
                        ...customConfig,
                        backgroundColor: color
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="SideBar-color-picker-field"
                    name="background"
                    value={customConfig.backgroundColor}
                    onChange={event => {
                      onCustomConfigChange({
                        ...customConfig,
                        backgroundColor: event.target.value
                      });
                    }}
                  />
                </div>
              </form>
            </div>
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
        <a href="https://twitter.com/fangpenlin">
          <img src="icon-code.svg" alt="Code icon" />
          <span className="link">Fang-Pen Lin</span>
        </a>
        <a href="https://twitter.com/pablostanley">
          <img src="icon-design.svg" alt="Design icon" />
          <span className="link">Pablo Stanley</span>
        </a>
      </div>
    </div>
  );
};
export default SideBar;
