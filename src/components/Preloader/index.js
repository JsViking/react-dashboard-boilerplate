import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  preloaderWrapper: {
    position: 'relative',
    margin: 50,
    textAlign: 'center',
  },
}));

const Preloader = () => {
  const classes = useStyles();

  return (
    <div className={classes.preloaderWrapper}>
      <CircularProgress />
      <div>Загрузка...</div>
    </div>
  );
};

export default Preloader;
