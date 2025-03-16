import { errors } from '../config/errors';
import db from '../db';
import { CustomError } from '../services/userService';
import { buildSelectQueryForTable } from '../utils/helpers';

export type Client = {
  name: string;
  last_name: string;
  phone_number: string;
  userId: string;
  notes?: string;
  revenue?: number;
};

export const getClientByKey = (key: string) => async (value: string) => {
  try {
    return await db.any(`SELECT * FROM clients WHERE ${key} = $1`, [value]);
  } catch (error) {
    console.error('Error fetching client by key:', error);
    throw error;
  }
};

export const createClient = async (client: Client) => {
  const { name, last_name, phone_number, notes, userId, revenue } = client;

  let query = `
    INSERT INTO clients (name, last_name, phone_number, user_id${revenue !== undefined ? ', revenue' : ''}
  `;

  const values = [name, last_name, phone_number, userId];
  if (revenue !== undefined) values.push(revenue.toString());
  if (notes) {
    query += `, notes) VALUES ($1, $2, $3, $4${revenue !== undefined ? ', $5' : ''}, $${
      revenue !== undefined ? '6' : '5'
    }) RETURNING id, name, last_name, phone_number, user_id, notes, revenue`;
    values.push(notes);
  } else {
    query += `) VALUES ($1, $2, $3, $4${revenue !== undefined ? ', $5' : ''}) RETURNING id, name, last_name, phone_number, user_id${
      revenue !== undefined ? ', revenue' : ''
    }`;
  }

  try {
    return await db.one(query, values);
  } catch (error) {
    throw new CustomError(errors.INTERNAL_SERVER_ERROR.message, 500);
  }
};

export const fetchDatabaseClients = async (userId: string, query: { search?: string; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }) => {
  let dbQuery = buildSelectQueryForTable('clients');

  const values: any[] = [userId];
  if (query.search) {
    dbQuery += ` AND (name ILIKE $2 OR last_name ILIKE $2 OR phone_number ILIKE $2)`;
    values.push(`%${query.search}%`);
  }

  if (query.sortBy && query.sortOrder) {
    dbQuery += ` ORDER BY ${query.sortBy} ${query.sortOrder}`;
  }

  try {
    return await db.manyOrNone(dbQuery, values);
  } catch (error) {
    throw new CustomError(errors.INTERNAL_SERVER_ERROR.message, 500);
  }
};

export const deleteDatabaseClient = async (clientId: string) => {
  try {
    return await db.none('DELETE FROM clients WHERE id = $1', [clientId]);
  } catch (error) {
    throw new CustomError(errors.INTERNAL_SERVER_ERROR.message, 500);
  }
};
export const clientDatabaseStatistic = async (userId: string) => {
  try {
    const newUsersThisMonth = await db.one(
      `SELECT COUNT(*) FROM clients WHERE user_id = $1 AND created_at >= date_trunc('month', CURRENT_DATE)`,
      [userId],
    );

    const newUsersThisWeek = await db.one(
      `SELECT COUNT(*) FROM clients WHERE user_id = $1 AND created_at >= date_trunc('week', CURRENT_DATE)`,
      [userId],
    );

    const totalUsers = await db.one(`SELECT COUNT(*) FROM clients WHERE user_id = $1`, [userId]);
    const newestUser = await db.one(`SELECT * FROM clients WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [userId]);

    const mostValuableUser = await db.one(
      `SELECT * FROM clients WHERE user_id = $1 AND revenue IS NOT NULL ORDER BY revenue DESC LIMIT 1`,
      [userId],
    );

    return {
      newUsersThisMonth: parseInt(newUsersThisMonth.count, 10),
      newUsersThisWeek: parseInt(newUsersThisWeek.count, 10),
      totalUsers: parseInt(totalUsers.count, 10),
      newestUser,
      mostValuableUser,
    };
  } catch (error) {
    throw new CustomError(errors.INTERNAL_SERVER_ERROR.message, 500);
  }
};
