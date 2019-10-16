import "./ColorPicker.css";

import React, { useState } from "react";

import { SketchPicker } from "react-color";

export interface Props {
  readonly color: string;
  readonly onChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = props => {
  const [active, setActive] = useState<boolean>(false);

  const { color, onChange } = props;
  return (
    <>
      <a
        href="#"
        className="ColorPicker-button"
        style={{ backgroundColor: color }}
        onClick={() => {
          setActive(true);
          return false;
        }}
      ></a>
      {active ? (
        <div className="ColorPicker-anchor">
          <div className="ColorPicker-popover">
            <div
              className="ColorPicker-cover"
              onClick={() => {
                setActive(false);
              }}
            ></div>
            <SketchPicker
              color={color}
              onChange={color => onChange(color.hex)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ColorPicker;
