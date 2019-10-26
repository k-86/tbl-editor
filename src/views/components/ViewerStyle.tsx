import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { InputAdornment, TextField } from "@material-ui/core";
import { ViewerSetting } from "../../constants";

export type StateProps = {
  viewerHeight: number;
};

export type DispatchProps = {
  setViewerHeight: (height: number) => void;
};

const ViewerStyle: React.FC<StateProps & DispatchProps> = ({
  viewerHeight,
  setViewerHeight
}): ReactElement => {
  const { min, step } = ViewerSetting.viewerHeight;
  const [inputData, setInputData] = React.useState(viewerHeight);

  const debounceChangeInput = React.useCallback(
    debounce((e: number): void => {
      setViewerHeight(e);
    }, 500),
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const data = Number(e.target.value);
    const size = Math.max(data, min);

    setInputData(size);
    debounceChangeInput(size);
  };

  return (
    <TextField
      id="time-table-content-height"
      label="時刻表リスト・時刻表・備考データ"
      margin="dense"
      variant="outlined"
      type="number"
      required
      fullWidth
      /* eslint-disable react/jsx-no-duplicate-props */
      inputProps={{
        min,
        step
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">px</InputAdornment>
      }}
      /* eslint-enable react/jsx-no-duplicate-props */
      value={inputData}
      onChange={handleChangeInput}
    />
  );
};

export default ViewerStyle;
