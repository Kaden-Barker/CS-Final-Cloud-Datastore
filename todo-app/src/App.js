import './App.css'
import React, { useState, useEffect  } from 'react';

function App() {
    const [postData, setPostData] = useState({
        text: ''
    });

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/posts');
          const data = await response.json();
          setTodos(data);
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  };

    const handleChange = (e) => {
        setPostData({
            ...postData,
            text: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data); // handle the response data as needed
            setTodos([...todos, data.todo]); // Update todos with the returned todo
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
      try {
          const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
              method: 'DELETE'
          });
          // Handle response if needed
          console.log(response);
          // Fetch todos again to update the list
          fetchTodos();
      } catch (error) {
          console.error('Error deleting todo:', error);
      }
  };

    return (
      <div className="App">
        <h1>To-Do List</h1>
        <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="text" 
              placeholder="Enter your todo" 
              value={postData.text} 
              onChange={handleChange} 
            />
            <button type="submit">Add Todo</button>
        </form>

        <ul>
            {todos.map((todo, index) => (
            <li key={index}>
              {todo.text}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
            
          ))}
        </ul>


    </div>
    );
}

export default App;

