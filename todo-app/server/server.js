import { Datastore } from '@google-cloud/datastore';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Initialize Database
const datastore = new Datastore({
    projectId: 'final-project-417018',
    keyFilename: './final-project-417018-8d2f3de063b8.json' // Key to service account that gives permission to access the datastore
});

app.use(bodyParser.json()); // Allows us to read json data

// Post to send data into the database
app.post('/api/posts', (req, res) => {

    console.log("recieved post request")
    const { text } = req.body;
    console.log({text})

    if (!text) {
        return res.status(400).json({ error: 'Text is required for a todo' });
    }

    // Create a new entity
    const todoEntity = {
        key: datastore.key('Todos'), 
        data: {
            text: text,
            isComplete: false,
        }
    };

    // Save the entity to Datastore
    datastore.save(todoEntity)
        .then(() => {
            console.log('Todo saved successfully');
            res.status(201).json({ message: 'Todo created successfully', todo: todoEntity }); // return the created todo
        })
        .catch(err => {
            console.error('Error saving todo:', err);
            res.status(500).json({ error: 'Failed to save todo' });
        });
});

// Endpoint to retrieve all todos
app.get('/api/posts', async (req, res) => {
    try {
        const query = datastore.createQuery('Todos');
        const [todos] = await datastore.runQuery(query);

        // Map todos to include id property
        const todosWithIds = todos.map((todo) => ({
            id: todo[datastore.KEY].id,
            text: todo.text,
            isComplete: todo.isComplete
        }));
        res.status(200).json(todosWithIds);
    } catch (error) {
        console.error('Error retrieving todos:', error);
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
});

// Endpoint to delete a todo
app.delete('/api/posts/:id', async (req, res) => {
    const todoId = req.params.id;
    const todoKey = datastore.key(['Todos', parseInt(todoId, 10)]);
    try {
        await datastore.delete(todoKey);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
