import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { Box, Grid, TextField } from "@material-ui/core";
import { Save, SaveAlt } from "@material-ui/icons";
import ProgressButton from "./ProgressButton";
import { handleExportTBL } from "./componentUtils";

export type StateProps = {
  editFileName: string;
  editData: string;
  disableEdit: boolean;
  isEditDataChanged: boolean;
  inputRow: number;
};

export type DispatchProps = {
  save: (fileName: string, data: string) => void;
  changeInput: (data: string) => void;
};

const TextEditor: React.FC<StateProps & DispatchProps> = ({
  editFileName,
  editData,
  disableEdit,
  isEditDataChanged,
  inputRow,
  save,
  changeInput
}): ReactElement => {
  const [changing, setChanging] = React.useState(false);
  const [inputData, setInputData] = React.useState(editData);

  const debounceChangeInput = React.useCallback(
    debounce((e: string): void => {
      changeInput(e);
      setChanging(false);
    }, 500),
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const data = e.target.value;
    setInputData(data);
    setChanging(true);
    debounceChangeInput(data);
  };

  React.useEffect((): void => {
    setInputData(editData);
  }, [editFileName, editData]);

  return (
    <Box>
      <form noValidate autoComplete="off">
        <TextField
          id="time-table-input"
          label="時刻表データ"
          fullWidth
          multiline
          rows={inputRow}
          margin="normal"
          variant="outlined"
          disabled={disableEdit}
          value={inputData}
          onChange={handleChangeInput}
        />

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <ProgressButton
              variant="contained"
              color="primary"
              startIcon={<Save />}
              disabled={!isEditDataChanged}
              onClick={(): void => save(editFileName, editData)}
              isChanging={changing}
            >
              Save
            </ProgressButton>
          </Grid>

          <Grid item>
            <ProgressButton
              variant="contained"
              color="primary"
              startIcon={<SaveAlt />}
              onClick={(): void => handleExportTBL(editFileName, editData)}
              isChanging={changing}
            >
              Export
            </ProgressButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TextEditor;
