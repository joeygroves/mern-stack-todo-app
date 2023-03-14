import { useState, useEffect } from 'react';

const API_BASE = "https://localhost:3001";

function App() {
    const [ todos, setTodos ] = useState([]);
    const [ popupActive, setPopupActive ] = useState(false);
    const [ newTodo, setNewTodo ] = useState("");

    // Only call this once the component mounts
    useEffect (() => {
        GetTodos();

        console.log(todos);
    }, []);

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err));
    };

    return (
        <div className="App">
            <h1>Welcome, Joey</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                {todos.map(todo => (
                <div className="todo">
                    <div className="checkbox"></div>
                    
                    <div className="text">Get milk</div>

                    <div className="delete-todo">x</div>
                </div>
                ))};
            </div>
        </div>
    );
}

export default App;
