import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    progress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

type Props = ButtonProps<"button", { isChanging: boolean }>;

const ProgressButton: React.FC<Props> = (props): ReactElement => {
  const classes = useStyles();
  const { isChanging, ...btnProps } = props;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...btnProps}
          // eslint-disable-next-line react/destructuring-assignment
          disabled={!isChanging ? props.disabled : true}
        />
        {isChanging && (
          <CircularProgress size={24} className={classes.progress} />
        )}
      </div>
    </div>
  );
};

export default ProgressButton;
