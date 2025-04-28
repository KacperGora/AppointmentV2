import { clientDatabaseStatistic, createClient, deleteDatabaseClient, fetchDatabaseClients, getClientByKey } from '../models/Client';
import { ORDER_DIRECTION } from '../types/queryTypes';
import { SORT_ORDER_ENUM } from '../utils/enums';
import { CustomError } from './userService';

const { ASC, DESC } = SORT_ORDER_ENUM;

export const clientService = {
  async getClients(userId: string, query: { search?: string; sortBy?: string; sortOrder?: ORDER_DIRECTION }) {
    const { search = '', sortBy = 'name', sortOrder = ASC } = query;

    if (![ASC, DESC].includes(sortOrder)) {
      throw new CustomError('Invalid sortOrder', 400, 'INVALID_SORT_ORDER');
    }
    const clients = (await fetchDatabaseClients(userId, { search, sortBy, sortOrder })) || [];
    return clients || [];
  },
  async addClient(client: { name: string; last_name: string; phone_number: string; userId: string; notes?: string }) {
    if (!client.name || !client.last_name || !client.phone_number || !client.userId) {
      throw CustomError.fromKey('INVALID_CLIENT_ADD_REQUEST');
    }
    const existingClientWithPhoneNumber = await getClientByKey('phone_number')(client.phone_number);
    if (existingClientWithPhoneNumber.length) {
      throw CustomError.fromKey('CLIENT_EXISTS');
    }
    return await createClient(client);
  },
  async deleteClient(clientId: string) {
    return await deleteDatabaseClient(clientId);
  },
  async getStatistics(userId: string) {
    return await clientDatabaseStatistic(userId);
  },
};
