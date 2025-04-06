const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://marlondavid0526:AAEbJExRT0Q8inS4@aplicationitm.05edg.mongodb.net';

const client = new MongoClient(uri);

let inventory;
let ingredients = null;
let recipes = null;

async function run() {
    try {
        console,log(`Trying to connect with mongo client`);
        await client.connect();
        console,log(`Connection succeeded`);
        const database = client.db('restaurant');
        if (!database) {
            throw new Error('Database <restaurant> not found');
        }
        console,log(`Using ${database.databaseName} database`);
        inventory = database.collection('inventory');
        recipes = database.collection('recipes');
        ingredients = database.collection('ingredients');
    }
    finally {
        await client.close();
    }
}

console,log(`Starting database connection <${uri}>`);
await run().catch(e => {console .log('Jodido')})

module.exports = {
    inventory,
    recipes,
    ingredients
};