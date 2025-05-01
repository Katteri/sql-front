import api from './index';

async function register(newUser) {
  try {
    const response = await api.post(['auth', 'register'].join('/'), newUser);
    return response;
  } catch (error) {
    throw error.detail?.msg;
  }
}

export { register };