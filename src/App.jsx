import "./App.css";
import { fetchUser } from "./components/data";
import { useState, useEffect, useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return action.payload.map((u) => ({
        ...u,
        category: "default",
        like: false,
      }));

    case "EDIT_CATEGORY":
      return state.map((u) =>
        u.id === action.payload.id
          ? { ...u, category: action.payload.category }
          : u
      );

    case "TOGGLE_LIKE":
      return state.map((u) =>
        u.id === action.payload.id ? { ...u, like: !u.like } : u
      );

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, []);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        dispatch({
          type: "SET_USER",
          payload: userData.data,
        });
      } catch (error) {
        console.error("error");
      }
    };

    fetchData();
  }, []);

  function handleEdit(id) {
    setEdit(id);
  }

  function handleAdd(updatedUser) {
    dispatch({ type: "EDIT_CATEGORY", payload: updatedUser });
    setEdit(null);
  }

  return (
    <div>
      <p>ฝึก push pull ที่นี่</p>
      <ul>
        {state.map((eachUser) => (
          <li key={eachUser.id}>
            <p>{eachUser.first_name}</p>
            {edit === eachUser.id ? (
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const updatedUser = {
                      ...eachUser,
                      category: e.target.value,
                    };
                    console.log(updatedUser);
                    handleAdd(updatedUser);
                  }
                }}
              />
            ) : (
              <p onClick={() => handleEdit(eachUser.id)}>{eachUser.category}</p>
            )}
            <img src={eachUser.avatar} alt="profile" />

            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_LIKE", payload: { id: eachUser.id } })
              }
            >
              {eachUser.like ? "like" : "unlike"}
            </button>
          </li>
        ))}
      </ul>
      //แสดงผลแยก category อาจจะต้องใช้ reduce
    </div>
  );
}

export default App;
