// @material-ui/icons
import AppsIcon from '@material-ui/icons/Apps';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HistoryIcon from '@material-ui/icons/History';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// core components/views for Admin layout
import ListUsers from 'views/Administration/Users/ListUsers';
import CrudUser from 'views/Administration/Users/CrudUser';
import LastActivities from 'views/Administration/LastActivities';
import Permissions from 'views/Administration/Permissions';
import MainPage from 'views/MainPage';

const administrationRoutes = [
  {
    path: '/administration/users',
    name: 'Пользователи',
    icon: PeopleOutlineIcon,
    component: ListUsers,
    layout: '/admin',
    show: false,
    subMenuShow: true,
  },
  {
    path: '/administration/users/new',
    name: 'Добавить пользователя',
    icon: GroupAddIcon,
    component: CrudUser,
    layout: '/admin',
    show: false,
    subMenuShow: false,
  },
  {
    path: '/administration/users/edit/:id',
    name: 'Редактировать пользователя',
    icon: GroupAddIcon,
    component: CrudUser,
    layout: '/admin',
    show: false,
    subMenuShow: false,
  },
  {
    path: '/administration/last_activities',
    name: 'Последние действия',
    icon: HistoryIcon,
    component: LastActivities,
    layout: '/admin',
    show: false,
    subMenuShow: true,
  },
  {
    path: '/administration/permissions',
    name: 'Доступы',
    icon: PermIdentityIcon,
    component: Permissions,
    layout: '/admin',
    show: false,
    subMenuShow: true,
  },
];

const dashboardRoutes = [
  {
    path: '/',
    name: 'Главная',
    icon: AppsIcon,
    component: MainPage,
    layout: '/admin',
    show: false,
  },
  {
    name: 'Аккаунты',
    icon: SupervisorAccountIcon,
    layout: '/admin',
    show: true,
    subLinks: administrationRoutes,
  },
  ...administrationRoutes,
];

export default dashboardRoutes;
