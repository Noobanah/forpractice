import "./App.css";
import { fetchUser } from "./components/data";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
        console.log(userData);
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
    </div>
  );
}

export default App;
