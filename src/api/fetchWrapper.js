export const fetchWrapper = async (url, options = {}) => {
    const token = localStorage.getItem('Authorization');
    const headers = {
      ...options.headers,
      Authorization: token || '',
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    if (!response.ok || data.code !== 'SUCCESS') {
      throw new Error(data.message || 'API 요청 실패');
    }
    return data.response;
  };