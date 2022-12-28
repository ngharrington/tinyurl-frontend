import { React } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CopyDialog(props) {
  const { onClose, code, open, apiUrl } = props;

  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    var tinyUrl = apiUrl + "/" + code;
    navigator.clipboard
      .writeText(tinyUrl)
      .then(() => { return })
      .catch(() => {
        alert("something went wrong");
      });
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Click to copy small url.</DialogTitle>
      <Typography align="center" variant="h6" sx={{pt: "0px", pl: "15px", pr: "15px"}}>{apiUrl + "/" + code}</Typography>
      <Button variant="contained" onClick={handleClick}>Copy</Button>
    </Dialog>
  );
}
  
CopyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  apiUrl: PropTypes.string.isRequired,
};


export default CopyDialog;

