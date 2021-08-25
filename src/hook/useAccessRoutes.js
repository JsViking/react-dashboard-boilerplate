/* eslint-disable no-param-reassign */
import { useSelector } from 'react-redux';
import routes from '../routes.js';

const useAccessRoutes = () => {
  const permissions = useSelector((state) => state.auth.user_permissions);
  const slugPermissions = permissions.map((permission) => permission.slug);
  const prepareAccessRoutes = routes.filter(
    (route) =>
      slugPermissions.includes(route.path) ||
      route.path === '/' ||
      route.subLinks
  );
  prepareAccessRoutes.forEach((route) => {
    if (route.subLinks) {
      route.subLinksAccess = route.subLinks.filter((link) =>
        slugPermissions.includes(link.path)
      );
    }
  });
  return prepareAccessRoutes;
};

export default useAccessRoutes;
