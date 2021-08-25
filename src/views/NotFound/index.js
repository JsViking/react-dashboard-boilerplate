import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotFound: {
    paddingTop: 15,
    textAlign: 'center',
  },
}));

const NotFound = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Paper style={{ padding: 15, marginBottom: 15 }} elevation={0}>
      <div className={classes.wrapper}>
        <div>
          <ButtonGroup aria-label="outlined primary button group">
            <Button onClick={() => history.goBack()}>Назад</Button>
            <Button onClick={() => history.push('/admin')}>На главную</Button>
          </ButtonGroup>
          <div className={classes.textNotFound}>401 - Доступ запрещен!</div>
        </div>
      </div>
    </Paper>
  );
};

export default NotFound;
