import "./ColorPicker.css";

import { Color, SketchPicker } from "react-color";
import React, { useState } from "react";

export interface Props {
  readonly color: string;
  readonly onChange: (color: string) => void;
}

const alphaToHex = (alpha: number) => {
  if (alpha === 1) {
    // just omit alpha hex part if it's 1
    return "";
  }
  // TODO: seems like odd bug when alpha is 0
  var hex: string = Math.trunc(alpha * 255).toString(16);
  if (hex.length <= 1) {
    hex = "0" + hex;
  }
  return hex;
};

const hexToRGBA = (hex: string): Color => {
  if (!hex.startsWith("#")) {
    return hex;
  }
  if (/^#([A-Fa-f0-9]{2}){4}$/.test(hex)) {
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16),
      a: parseInt(hex.substring(7, 9), 16) / 255
    };
  }
  return hex;
};

const ColorPicker: React.FC<Props> = props => {
  const [active, setActive] = useState<boolean>(false);

  const { color, onChange } = props;
  return (
    <>
      <a
        href="#"
        className={
          active
            ? "ColorPicker-button ColorPicker-button-active"
            : "ColorPicker-button"
        }
        onClick={() => {
          setActive(true);
          return false;
        }}
      >
        <div
          className="ColorPicker-button-color"
          style={{ backgroundColor: color }}
        />
      </a>
      {active ? (
        <div className="ColorPicker-anchor">
          <div className="ColorPicker-popover">
            <div
              className="ColorPicker-cover"
              onClick={() => {
                setActive(false);
                return false;
              }}
            ></div>
            <SketchPicker
              color={hexToRGBA(color)}
              onChange={color =>
                onChange(color.hex + alphaToHex(color.rgb.a || 1))
              }
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ColorPicker;
