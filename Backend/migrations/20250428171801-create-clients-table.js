// migrations/20250428190000-create-clients-table.js

exports.up = (db, callback) => {
  db.runSql(
    `
    CREATE TABLE clients (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(50) NOT NULL,
      user_id UUID NOT NULL,
      notes TEXT,
      revenue DECIMAL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
      CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `,
    callback,
  );
};

exports.down = (db, callback) => {
  db.runSql('DROP TABLE clients', callback);
};
