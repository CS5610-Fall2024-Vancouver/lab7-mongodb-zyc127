const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://hazrabano:root@cluster0.ejxrv.mongodb.net/";   // update your own connection string here

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } finally {
    await client.close();
  }
}

main().catch(console.error);
