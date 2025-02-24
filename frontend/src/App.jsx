import { useEffect, useState } from "react";
import api from "./api/axiosConfig";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [editName, setEditName] = useState("");

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
        if (!newItem.trim()) return;
        try {
            const response = await api.post("/items", { name: newItem });
            setItems([...items, response.data]);
            setNewItem("");
        } catch (error) {
            console.error("Error adding item:", error.response ? error.response.data : error.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            await api.delete(`/items/${id}`);
            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const startEditing = (item) => {
        setEditingItem(item);
        setEditName(item.name);
    };

    const saveEdit = async () => {
        if (!editName.trim()) return;
        try {
            const response = await api.put(`/items/${editingItem.id}`, { name: editName });
            console.log("Edit Response:", response.data);

            setItems(items.map((item) =>
                item.id === editingItem.id ? { ...item, name: editName } : item
            ));
            setEditingItem(null);
        } catch (error) {
            console.error("Error updating item:", error.response ? error.response.data : error.message);
        }
    };



    return (
        <div className="container text-center p-5 shadow rounded" style={{ maxWidth: "600px", backgroundColor: "white" }}>
            <h1 className="text-primary mb-4">My Simple CRUD App</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter item name"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button className="btn btn-success" onClick={addItem}>Add</button>
            </div>

            <ul className="list-group">
                {items.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingItem && editingItem.id === item.id ? (
                            <input
                                type="text"
                                className="form-control w-50"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        ) : (
                            <span className="fs-5">{item.name}</span>
                        )}

                        <div>
                            {editingItem && editingItem.id === item.id ? (
                                <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>Save</button>
                            ) : (
                                <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(item)}>Edit</button>
                            )}
                            <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;