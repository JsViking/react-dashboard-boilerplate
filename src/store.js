import { init } from '@rematch/core';
import { snakebar } from './models/snakebar';
import { dialog } from './models/dialog';
import { auth } from './models/auth';

export const store = init({
  models: {
    snakebar,
    dialog,
    auth,
  },
});
