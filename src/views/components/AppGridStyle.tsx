import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { TextField } from "@material-ui/core";
import { AppSetting } from "../../constants";

export type StateProps = {
  appGridRow: number;
};

export type DispatchProps = {
  setAppGridRow: (size: number) => void;
};

const AppGridStyle: React.FC<StateProps & DispatchProps> = ({
  appGridRow,
  setAppGridRow
}): ReactElement => {
  const { min, max, step } = AppSetting.appGridRow;
  const [inputData, setInputData] = React.useState(appGridRow);

  const debounceChangeInput = React.useCallback(
    debounce((e: number): void => {
      setAppGridRow(e);
    }, 500),
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const data = Number(e.target.value);
    const size = Math.min(Math.max(data, min), max);

    setInputData(size);
    debounceChangeInput(size);
  };

  return (
    <TextField
      id="app-grid-size"
      label="左右のGrid Size"
      helperText={`Size:${min}~${max}`}
      margin="dense"
      variant="outlined"
      type="number"
      required
      fullWidth
      inputProps={{
        min,
        max,
        step
      }}
      value={inputData}
      onChange={handleChangeInput}
    />
  );
};

export default AppGridStyle;
