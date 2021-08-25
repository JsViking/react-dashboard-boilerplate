import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// core components
import Admin from 'layouts/Admin';
import Snackbar from 'components/Snackbar/Snackbar';
import Dialog from 'components/Dialog/Dialog';
import AddAlert from '@material-ui/icons/AddAlert';
import Auth from 'layouts/Auth';
import PrivateRoute from 'hoc/PrivateRoute';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const snakebarData = useSelector((state) => state.snakebar);
  const dispatch = useDispatch();
  useEffect(dispatch.auth.autoLogin, []);
  return (
    <>
      <Dialog />
      <Snackbar
        place="tr"
        color={snakebarData.type}
        icon={AddAlert}
        message={snakebarData.message}
        open={snakebarData.isShow}
        closeNotification={dispatch.snakebar.close}
        close
      />
      <Switch>
        {!isAuth && <Route path="/auth" component={Auth} />}
        <PrivateRoute
          path="/admin"
          component={Admin}
          isAuthenticated={isAuth}
        />
        <Redirect from="/" to="/admin" />
      </Switch>
    </>
  );
};

export default App;
