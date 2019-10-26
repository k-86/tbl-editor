import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { InputAdornment, TextField } from "@material-ui/core";
import { EditorSetting } from "../../constants";

export type StateProps = {
  textEditorRow: number;
};

export type DispatchProps = {
  setTextEditorRow: (row: number) => void;
};

const EditorStyle: React.FC<StateProps & DispatchProps> = ({
  textEditorRow,
  setTextEditorRow
}): ReactElement => {
  const { min, step } = EditorSetting.textEditorRow;
  const [inputData, setInputData] = React.useState(textEditorRow);

  const debounceChangeInput = React.useCallback(
    debounce((e: number): void => {
      setTextEditorRow(e);
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
      id="tbl-text-editor-input-row"
      label="入力欄の表示行数"
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
        endAdornment: <InputAdornment position="end">行</InputAdornment>
      }}
      /* eslint-enable react/jsx-no-duplicate-props */
      value={inputData}
      onChange={handleChangeInput}
    />
  );
};

export default EditorStyle;
