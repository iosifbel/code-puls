import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
  },
}));

export default function Popup(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [content, setContent] = useState("");

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  useEffect(() => {
    console.log("parent props changed");
    setAnchorEl(props.target);
    setContent(props.content);
  }, [props]);

  const handleClose = () => {
    setAnchorEl(null);
    props.closeCallback(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>{content}</Typography>
      </Popover>
    </div>
  );
}
