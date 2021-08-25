import { getToken, refreshToken, getUser } from '../request';
import jwt_decode from 'jwt-decode';

const regex = /\/{1}/;

export const auth = {
  name: 'auth',
  state: {
    isAuth: true,
    id: null,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    refresh: '',
    access: '',
    exp: null,
    user_permissions: [],
    sitePermissions: [],
  },
  reducers: {
    setAuthData: (state, payload) => ({ ...state, ...payload }),
    clearAuthData: () => ({ isAuth: false }),
  },
  effects: {
    async getAccessToken(payload) {
      let success = false;
      const authData = await getToken(payload);
      if (authData.access) {
        this.setAuthData(authData);
        localStorage.setItem('access', authData.access);
        localStorage.setItem('refresh', authData.refresh);
        const decodeAccessData = jwt_decode(authData.access);
        const userData = await getUser(decodeAccessData.user_id);
        const sitePermissions = userData?.user_permissions.filter(
          (el) => !regex.test(el.slug)
        );
        this.setAuthData({ ...userData, sitePermissions, isAuth: true });
        success = true;
      }
      return success;
    },
    async refreshAccessToken() {
      const refresh = localStorage.getItem('refresh');
      const { access, ...rest } = await refreshToken({ refresh });
      if (!access) {
        this.logOut();
        return {};
      }
      this.setAuthData({
        ...this.state,
        access,
        refresh: rest.refresh,
        isAuth: true,
      });
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', rest.refresh);
      const decodeData = jwt_decode(access);
      const userData = await getUser(decodeData.user_id);
      const sitePermissions = userData?.user_permissions.filter(
        (el) => !regex.test(el.slug)
      );
      this.setAuthData({
        ...userData,
        sitePermissions,
      });
      return access;
    },
    async autoLogin() {
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      if (access && access !== 'undefined' && refresh) {
        this.setAuthData({ access, refresh });
        const decodeData = jwt_decode(access);
        const userData = await getUser(decodeData.user_id);
        if (!userData.user_permissions) {
          this.logOut();
          return;
        }
        const sitePermissions = userData?.user_permissions.filter(
          (el) => !regex.test(el.slug)
        );
        this.setAuthData({
          ...this.state,
          ...userData,
          sitePermissions,
          isAuth: true,
        });
      } else if (refresh) {
        this.refreshAccessToken();
      } else {
        this.logOut();
      }
    },
    async logOut() {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      this.clearAuthData();
    },
  },
};
