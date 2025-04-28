import db from '../db';

export const getDashboardDatabaseStats = async () => {
  try {
    const stats = await db.one(`
            SELECT 
                (SELECT COUNT(id) FROM clients) AS total_clients,
                (SELECT COALESCE(SUM(revenue), 0) FROM clients) AS total_revenue,
                (SELECT COUNT(id) FROM clients WHERE created_at >= NOW() - INTERVAL '1 month') AS new_clients,
                (SELECT COUNT(id) FROM events) AS total_events,
                (SELECT AVG(end_time - start_time) FROM events) AS avg_event_duration,
                (SELECT AVG(price) FROM events) AS avg_event_price,
                (SELECT service FROM events GROUP BY service ORDER BY COUNT(service) DESC LIMIT 1) AS most_popular_service,
                (SELECT COUNT(id) FROM events WHERE start_time >= date_trunc('week', NOW())) AS events_this_week,
                (SELECT COUNT(id) FROM services) AS total_services,
                (SELECT name FROM services ORDER BY price DESC LIMIT 1) AS most_expensive_service,
                (SELECT name FROM services ORDER BY duration DESC LIMIT 1) AS longest_service,
                (SELECT COUNT(id) FROM users) AS total_users;
        `);

    console.log(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
};
