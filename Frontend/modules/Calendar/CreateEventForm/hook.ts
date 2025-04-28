import { api, apiRoutes } from '@helpers';
import { useQuery } from '@tanstack/react-query';
import { CustomerType, ServiceType } from '@types';

const {
  event: {
    fetchEventOptions: { path: eventOptions, queryKey },
  },
} = apiRoutes;

export const useGetEventOptions = () => {
  const { data = { clients: [], services: [] }, isLoading } = useQuery<{
    services: ServiceType[];
    clients: CustomerType[];
  }>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await api.get(eventOptions);
      return response.data as {
        services: ServiceType[];
        clients: CustomerType[];
      };
    },
  });

  return { data, isLoading };
};
