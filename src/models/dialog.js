export const dialog = {
  name: 'dialog',
  state: {
    isShow: false,
    message: '',
    onAgree: null,
  },
  reducers: {
    toggle: (state, payload) => ({
      ...state,
      ...{
        isShow: Boolean(payload.message),
        message: payload.message,
        onAgree:
          payload.onAgree && typeof payload.onAgree === 'function'
            ? payload.onAgree
            : null,
      },
    }),
    close: (state) => ({ ...state, isShow: false, onAgree: null }),
  },
  effects: {
    async onAgree(payload, rootState) {
      const { onAgree } = rootState.dialog;
      if (onAgree && typeof onAgree === 'function') onAgree();
      this.close();
    },
  },
};
