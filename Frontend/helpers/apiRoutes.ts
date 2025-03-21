export const apiRoutes = {
  client: {
    getList: { path: '/client/getClient', queryKey: 'clientList' },
    delete: { path: '/client/delete', queryKey: 'deleteClient' },
    addClient: { path: '/client/addClient', queryKey: 'addClient' },
    getStatistics: { path: '/client/statistic', queryKey: 'clientStatistics' },
  },
  event: {
    create: '/event/create',
    fetchEventOptions: { path: '/event/fetchEventOptions', queryKey: 'getEventsFormOptions' },
  },
  auth: {
    register: '/auth/register',
    refreshToken: '/auth/refresh-token',
    login: '/auth/login',
    logout: '/auth/logout',
  },
};
