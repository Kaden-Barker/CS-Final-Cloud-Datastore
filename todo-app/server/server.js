import { Datastore } from '@google-cloud/datastore';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Initialize Database
const datastore = new Datastore({
    projectId: 'final-project-417018',
    keyFilename: './final-project-417018-8d2f3de063b8.json' // Key to service account that gives permission to access the datastore
});

app.use(bodyParser.json()); // Allows us to read json data
app.use(cors()); // Add this line to enable CORS

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
            res.status(201).json({ message: 'Todo created successfully' });
        })
        .catch(err => {
            console.error('Error saving todo:', err);
            res.status(500).json({ error: 'Failed to save todo' });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
