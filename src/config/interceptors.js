export const attachAuthInterceptor = ((client, accessToken) => {
  client.interceptors.request.use(config => {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return config;
  });
});

export const attachResponseInterceptor = ((client) => {
  client.interceptors.response.use(config => {
    if (config.config.delay) {
      return new Promise(resolve => setTimeout(() => {
        resolve(config);
      }, config.config.delay));
    }
    return config;
  });
});

export const attachRequestInterceptor = ((client) => {
  client.interceptors.request.use(config => {
    return config;
  });
});