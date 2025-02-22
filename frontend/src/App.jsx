import { useEffect, useState } from "react";
import api from "./api/axiosConfig";

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get("/items");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        if (!newItem.trim()) return; // Prevent empty requests
        try {
            const response = await api.post("/items", { name: newItem });
            setItems([...items, response.data]); // Update UI with new item
            setNewItem(""); // Clear input field
        } catch (error) {
            console.error("Error adding item:", error.response ? error.response.data : error.message);
        }
    };


    return (
        <div>
            <h1>My Simple CRUD App</h1>
            <input
                type="text"
                placeholder="Enter item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
