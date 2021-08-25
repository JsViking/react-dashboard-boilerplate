/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const collapseHandler = (key) => {
    setOpen({ ...open, [key]: !open[key] });
  };
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const strictlyActiveRoute = (routeName) => {
    return window.location.pathname === routeName;
  };
  const { color, logo, image, logoText, routes } = props;
  const showRoutes = routes.filter(({ show }) => show);
  var links = (
    <List className={classes.list}>
      {showRoutes.map((prop, key) => {
        const listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        });
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });

        return (
          <>
            {prop.subLinksAccess ? (
              <div key={key}>
                <ListItem
                  button
                  className={classNames(
                    classes.itemLinkCollapce,
                    classes.itemLink + listItemClasses
                  )}
                  onClick={() => collapseHandler(prop.name)}
                >
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses
                      )}
                    />
                  )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                  {open[prop.name] ? (
                    <ExpandLess className={classes.itemText} />
                  ) : (
                    <ExpandMore className={classes.itemText} />
                  )}
                </ListItem>
                <Collapse in={open[prop.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {prop.subLinksAccess.map((elem, index) => {
                      if (!elem.subMenuShow) return null;
                      const subListItemClasses = classNames({
                        [' ' + classes[color]]: strictlyActiveRoute(
                          elem.layout + elem.path
                        ),
                      });
                      const subWhiteFontClasses = classNames({
                        [' ' + classes.whiteFont]: strictlyActiveRoute(
                          elem.layout + elem.path
                        ),
                      });
                      return (
                        <NavLink
                          to={elem.layout + elem.path}
                          className={classes.item}
                          activeClassName="active"
                          key={index}
                        >
                          <ListItem
                            button
                            className={classes.itemLink + subListItemClasses}
                            size="small"
                          >
                            {typeof elem.icon === 'string' ? (
                              <Icon
                                className={classNames(
                                  classes.itemIcon,
                                  subWhiteFontClasses
                                )}
                              >
                                {elem.icon}
                              </Icon>
                            ) : (
                              <elem.icon
                                className={classNames(
                                  classes.itemIcon,
                                  subWhiteFontClasses
                                )}
                              />
                            )}
                            <ListItemText
                              primary={elem.name}
                              className={classNames(
                                classes.itemText,
                                subWhiteFontClasses
                              )}
                              disableTypography={true}
                            />
                          </ListItem>
                        </NavLink>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            ) : (
              <NavLink
                to={prop.layout + prop.path}
                className={classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem
                  button
                  className={classes.itemLink + listItemClasses}
                >
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses
                      )}
                    />
                  )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            )}
          </>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink, {
          [classes.logoEmpty]: !logo,
        })}
        target="_self"
      >
        {logo && (
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
        )}
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
