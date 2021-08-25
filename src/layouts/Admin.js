import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import NotFound from 'views/NotFound';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle';

import bgImage from 'assets/img/sidebar-2.jpg';
import useAccessRoutes from '../hook/useAccessRoutes';
// import Preloader from 'components/Preloader';

const COLOR = 'blue';
let ps;

const useStyles = makeStyles(styles);

const Admin = ({ ...rest }) => {
  const accessRoutes = useAccessRoutes();
  const userId = useSelector((state) => state.auth.id);
  // Если true рендерится без внешнего контейнреа и отступов
  const fullWidth = () => Boolean(false);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // Инициализация роутинга
  const switchRoutes = (
    <Switch>
      {accessRoutes.map((prop, key) => {
        if (prop.layout === '/admin' && prop.component) {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
              exact
            />
          );
        }
        return null;
      })}
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={accessRoutes}
        logoText="Dashboard"
        logo={null}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={COLOR}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={accessRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {userId &&
          (fullWidth() ? (
            <div className={classes.content}>{switchRoutes}</div>
          ) : (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;
