export const YOUTUBE_REGEXP =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export const loadScript = (src, cb, options = {}) => {
  const s = document.createElement('script');
  s.setAttribute('src', src);
  s.id = options.id || null;
  s.onload = () => {
    if (cb && typeof cb === 'function') cb();
  };
  document.body.appendChild(s);
};

export const querySerializer = (entries = []) => {
  let queryParams = '';
  let first = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    if (first) {
      queryParams = `?${key}=${value}`;
      first = false;
    } else queryParams += `&${key}=${value}`;
  }

  return queryParams;
};

export const emailValidation = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getBase64Image = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const objectToQuery = (obj) => {
  if (typeof obj !== 'object' || obj === null)
    throw new Error('Аргумент должен быть объектом');
  return Object.entries(obj).reduce(
    (acc, [key, value]) => (value ? `${acc}&${key}=${value}` : acc),
    ''
  );
};

export const download = (filename, url) => {
  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
