import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import { CircularProgress, Grid, TextField } from "@material-ui/core";

export type DispatchProps = {
  searchFile: (fileName: string) => void;
};

const TimeTableSearch: React.FC<DispatchProps> = ({
  searchFile
}): ReactElement => {
  const [changing, setChanging] = React.useState(false);
  const [inputData, setInputData] = React.useState("");

  const debounceChangeInput = React.useCallback(
    debounce((e: string): void => {
      searchFile(e);
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

  return (
    <Grid
      spacing={1}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item>
        <TextField
          label="ファイル検索"
          margin="dense"
          value={inputData}
          onChange={handleChangeInput}
        />
      </Grid>
      {changing && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};

export default TimeTableSearch;
