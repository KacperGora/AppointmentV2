'use strict';

exports.up = function (db, callback) {
  db.runSql(
    `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255),
      refresh_token VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql('DROP TABLE users;', callback);
};