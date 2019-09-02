import React, { ChangeEvent, useCallback } from "react";

import { default as DoodleProps } from "./doodles/Props";

export interface Props extends DoodleProps {
  readonly onInkColorUpdate: (color: string) => void;
  readonly onAccentColorUpdate: (color: string) => void;
}

const DoodleEditor: React.FC<Props> = props => {
  const {
    inkColor,
    accentColor,
    onInkColorUpdate,
    onAccentColorUpdate
  } = props;
  const memorizedOnInkColorUpdate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onInkColorUpdate(event.target.value),
    [onInkColorUpdate]
  );
  const memorizedOnAccentColorUpdate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onAccentColorUpdate(event.target.value),
    [onAccentColorUpdate]
  );
  return (
    <>
      <div>
        <label>
          Ink color:
          <input
            type="text"
            value={inkColor}
            onChange={memorizedOnInkColorUpdate}
          />
        </label>
      </div>
      <div>
        <label>
          Accent color:
          <input
            type="text"
            value={accentColor}
            onChange={memorizedOnAccentColorUpdate}
          />
        </label>
      </div>
    </>
  );
};
export default DoodleEditor;
