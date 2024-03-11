import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router";
import { set, ref, onValue, update, remove } from "firebase/database";
import { uid } from "uid";

export const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [store, setStore] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [storeUidd, setStoreUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const todosRef = ref(db, `/${auth.currentUser.uid}`);
        onValue(todosRef, (snapshot) => {
          const data = snapshot.val();
          setStore(data ? Object.values(data) : []);
        });
      } else if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const writeToDatabase = () => {
    const uidd = uid();
    const newTodo = { todo, uidd };
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), newTodo);
    setStore((oldStore) => [...oldStore, newTodo]);
    setTodo("");
  };

  const handleUpdate = (selectedTodo) => {
    setIsEdit(true);
    setTodo(selectedTodo.todo);
    setStoreUidd(selectedTodo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${storeUidd}`), {
      todo: todo,
      uidd: storeUidd
    });

    setTodo("");
    setIsEdit(false);
    setStoreUidd("");
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    setStore((oldStore) => oldStore.filter((t) => t.uidd !== uid));
  };

  return (
    <div>
      <h1>To do list</h1>
      <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <div className="d-flex flex-row mb-5">
      <button className="btn btn-success" onClick={isEdit ? handleEditConfirm : writeToDatabase}>
        {isEdit ? "Confirmar edición" : "Añadir tarea"}
      </button>
      <button className="btn btn-danger" onClick={handleSignOut}>Cerrar sesión</button>
      </div>
      <ul>
        {store.map((item) => (
          <li key={item.uidd}>
            {item.todo}
            <div className="d-flex flex-row mb-5">
            <button className="btn btn-outline-warning" onClick={() => handleUpdate(item)}>Editar</button>
            <button className="btn btn-outline-danger" onClick={() => handleDelete(item.uidd)}>Eliminar</button>
            </div>          
          </li>
        ))}
      </ul>
    </div>
  );
};
