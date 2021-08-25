import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  minWidth: {
    minWidth: 300,
  },
});

const AlertDialog = ({ dialogData, closeDialog, onAgree }) => {
  const classes = useStyles();
  const handleClose = () => {
    closeDialog(false);
  };

  return (
    <div>
      <Dialog
        open={dialogData.isShow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.minWidth} id="alert-dialog-title">
          Внимание
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={onAgree} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapState = (state) => ({
  dialogData: state.dialog,
});

const mapDispatch = (dispatch) => ({
  closeDialog: dispatch.dialog.close,
  onAgree: dispatch.dialog.onAgree,
});

export default connect(mapState, mapDispatch)(AlertDialog);
