import "./App.css";
import { fetchUser } from "./components/data";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData.data);
        console.log(userData.data);
      } catch (error) {
        console.error("error");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>React ใช้ .jsx ได้! 🚀</h1>
      <p>ลองเปลี่ยน App.js เป็น App.jsx แล้ว!</p>
      <p>ฝึก push pull ที่นี่</p>
      <ul>
        {user.map((eachUser) => (
          <li key={eachUser.id}>
            <p>{eachUser.first_name}</p>
            <img src={eachUser.avatar} alt="profile picture"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
