// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const HOST = process.env.DATABASE_HOST || '127.0.0.1';
const USER = process.env.POSTGRES_USER || 'postgres';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'docker';
const DATABASE = process.env.POSTGRES_DB || 'prefix';
const PORT = process.env.PORT || 5432;

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      database: DATABASE
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection:'postgres://cplrpynkdtzjvg:34a76ba740c374bd4344580a14a704bd4d8dd44b6e01aa4e714a2b0c53b7f8ec@ec2-34-239-241-121.compute-1.amazonaws.com:5432/d6pgbehsrgmj7b?ssl=no-verify',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
