import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { TextField } from "@material-ui/core";
import { HistorySetting as Setting } from "../../constants";

export type StateProps = {
  historySize: number;
};

export type DispatchProps = {
  setHistorySize: (size: number) => void;
};

const HistorySetting: React.FC<StateProps & DispatchProps> = ({
  historySize,
  setHistorySize
}): ReactElement => {
  const { min, max } = Setting.historySize;
  const [inputData, setInputData] = React.useState(historySize);

  const debounceChangeInput = React.useCallback(
    debounce((e: number): void => {
      setHistorySize(e);
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
      id="tbl-history-max-size"
      label="保存履歴の最大記録数"
      helperText={`Size:${Setting.historySize.min}~${Setting.historySize.max}`}
      margin="dense"
      variant="outlined"
      type="number"
      required
      fullWidth
      inputProps={{
        min,
        max
      }}
      value={inputData}
      onChange={handleChangeInput}
    />
  );
};

export default HistorySetting;
