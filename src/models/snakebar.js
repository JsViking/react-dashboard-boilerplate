export const snakebar = {
  name: 'snakebar',
  state: {
    isShow: false,
    type: 'info', // "info", "success", "warning", "danger", "primary"
    message: '',
  },
  reducers: {
    toggle: (state, payload) => ({ ...state, ...payload }),
    close: (state) => ({ ...state, isShow: false, type: 'info', message: '' }),
  },
  effects: {
    showSnakebar(payload) {
      this.toggle(payload);
      setTimeout(this.close, 3000);
    },
  },
};
