const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://youcheng:123456zyc@cluster0.w6eps.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const dbName = 'taskManagerDB';
const collectionName = 'tasks';

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas!');

        const db = client.db(dbName);
        const tasks = db.collection(collectionName);

        const newTask = {
            title: "Complete MongoDB CRUD activity",
            description: "Write a Node.js script that performs CRUD operations in MongoDB Atlas",
            completed: false,
            dueDate: "2024-11-15"
        };
        const insertResult = await tasks.insertOne(newTask);
        console.log('Task inserted:', insertResult.insertedId);

        const multipleTasks = [
            { title: "Task 1", description: "First task", completed: false, dueDate: "2024-12-01" },
            { title: "Task 2", description: "Second task", completed: true, dueDate: "2024-12-10" },
            { title: "Task 3", description: "Third task", completed: false, dueDate: "2024-12-15" }
        ];
        const insertManyResult = await tasks.insertMany(multipleTasks);
        console.log(`${insertManyResult.insertedCount} tasks inserted.`);

        const allTasks = await tasks.find().toArray();
        console.log('All Tasks:', allTasks);

        const updateResult = await tasks.updateOne(
            { title: "Complete MongoDB CRUD activity" },
            { $set: { completed: true } }
        );
        console.log(`${updateResult.modifiedCount} task(s) updated.`);

        const deleteResult = await tasks.deleteOne({ title: "Task 2" });
        console.log(`${deleteResult.deletedCount} task(s) deleted.`);

        const futureTasks = await tasks.find({ dueDate: { $gt: new Date().toISOString().split('T')[0] } }).toArray();
        console.log('Future Tasks:', futureTasks);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}

main().catch(console.error);
