import './App.css'
import React, { useState } from 'react';

function App() {
    const [postData, setPostData] = useState({
        text: ''
    });

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
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div className="App">
        <h1>To-Do List</h1>
        <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter your todo" 
              value={postData.title} 
              onChange={handleChange} 
            />
            <button type="submit">Add Todo</button>
        </form>

    </div>
    );
}

export default App;

