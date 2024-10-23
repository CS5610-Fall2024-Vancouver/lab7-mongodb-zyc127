const { MongoClient } = require('mongodb');

// Define an async function to run our MongoDB operations
async function main() {
  // Define the MongoDB URI (this connects to localhost by default)
  const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string if needed

  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Define a database (if it doesn't exist, MongoDB will create it)
    const db = client.db("testdb");

    // Define a collection (if it doesn't exist, MongoDB will create it)
    const collection = db.collection("testcollection");

    // 1. Insert a document into the collection
    const insertResult = await collection.insertOne({ name: "Alice", age: 25 });
    console.log("Inserted document:", insertResult.insertedId); // Logs the unique ID of the inserted document

    // 2. Find a document using `findOne` - finds the first matching document
    const findOneResult = await collection.findOne({ name: "Alice" });
    console.log("Found one document:", findOneResult); // Logs the document we found

    // 3. Use `find` to retrieve all matching documents (in this case, documents with age >= 20)
    const cursor = collection.find({ age: { $gte: 20 } }); // Finds all documents where age is greater than or equal to 20
    const results = await cursor.toArray(); // Convert the cursor to an array of documents
    console.log("Found documents:", results); // Logs all found documents

  } catch (e) {
    console.error(e); // Handles any errors that occur
  } finally {
    // Close the connection to MongoDB when we're done
    await client.close();
  }
}

// Run the `main` function and catch any unhandled errors
main().catch(console.error);
