export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem('authToken', authToken);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};

export const loadReduxState = () => {
  try {
    const serialized = localStorage.getItem('reduxState');
    if (!serialized) {
      return undefined;
    }

    return JSON.parse(serialized);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const writeReduxState = state => {
  try {
    const { form, ...stateToSerialize } = state;
    const serialized = JSON.stringify({ ...stateToSerialize });
    localStorage.setItem('reduxState', serialized);
  } catch (e) {
    console.error(e);
  }
};
