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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUser();
        if (userData && userData.data) {
          dispatch({
            type: "SET_USER",
            payload: userData.data,
          });
        } else {
          setError("ข้อมูลผู้ใช้ไม่ถูกต้อง");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleEdit(id) {
    setEdit(id);
  }

  function handleAdd(e, eachUser) {
    if (e.key === "Enter") {
      const updatedUser = {
        id: eachUser.id,
        category: e.target.value,
      };
      dispatch({ type: "EDIT_CATEGORY", payload: updatedUser });
      setEdit(null);
    }
  }

  if (loading) return <div className="loading">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="error">เกิดข้อผิดพลาด: {error}</div>;
  if (state.length === 0)
    return <div className="no-data">ไม่พบข้อมูลผู้ใช้</div>;

  return (
    <div className="container">
      <h1>ระบบจัดการผู้ใช้</h1>
      <h2>รายชื่อผู้ใช้</h2>
      <ul className="user-list">
        {state.map((eachUser) => (
          <li key={eachUser.id} className="user-item">
            <div className="user-header">
              <img
                src={eachUser.avatar}
                alt={`${eachUser.first_name} profile`}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>
                  {eachUser.first_name} {eachUser.last_name}
                </h3>
                <div className="user-category">
                  <span>หมวดหมู่: </span>
                  {edit === eachUser.id ? (
                    <input
                      defaultValue={eachUser.category}
                      onKeyDown={(e) => handleAdd(e, eachUser)}
                      autoFocus
                      className="category-input"
                    />
                  ) : (
                    <span
                      onClick={() => handleEdit(eachUser.id)}
                      className="category-text"
                    >
                      {eachUser.category}
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_LIKE",
                      payload: { id: eachUser.id },
                    })
                  }
                  className={`like-button ${eachUser.like ? "liked" : ""}`}
                >
                  {eachUser.like ? "ถูกใจแล้ว" : "ถูกใจ"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2>จัดกลุ่มตามหมวดหมู่</h2>
      <ul className="category-list">
        {Object.entries(
          state.reduce((acc, user) => {
            if (!acc[user.category]) {
              acc[user.category] = [];
            }
            acc[user.category].push(user);
            return acc;
          }, {})
        ).map(([category, users]) => (
          <li key={category} className="category-item">
            <h3>หมวดหมู่: {category}</h3>
            <ul className="category-users">
              {users.map((user) => (
                <li key={user.id} className="category-user">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} thumbnail`}
                    className="user-thumbnail"
                  />
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                  {user.like && <span className="liked-indicator">♥</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
