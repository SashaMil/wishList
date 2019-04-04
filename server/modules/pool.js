/* the only line you likely need to change is
 database: 'prime_app',
 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.splice('/')[1],
        ssl: true, // heroke requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeutMillis: 30000, //How long a client is allowed to remain idlbe before being closed
    };
}
else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'wishlist',
        max: 10,
        idleTimeutMillis: 30000,
    }
}

// This creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool will log when it connects to the database
pool.on('connect', () => {
    console.log('Posgres connected');
});

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

////////