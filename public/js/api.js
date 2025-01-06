const API_URL = 'http://localhost:5000/api';

async function apiRequest(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {},
    };

    if (data) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Une erreur est survenue');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}