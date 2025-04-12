import "./App.css";
import { fetchUser } from "./components/data";
import { useState, useEffect } from "react";

//reducer function มีหลาย action
//เพิ่ม category
//แก้ category
//like, unlike

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        const userWithCategory = userData.data.map((u) => ({
          ...u,
          category: "default",
        }));
        setUser(userWithCategory);
      } catch (error) {
        console.error("error");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>ฝึก push pull ที่นี่</p>
      <ul>
        {user.map((eachUser) => (
          <li key={eachUser.id}>
            <p>{eachUser.first_name}</p>
            <img src={eachUser.avatar} alt="profile picture" />
            <p>{eachUser.category}</p>
            {/* //ปุ่มเพิ่ม category //เงื่อนไข แสดงเพิ่ม category โดยดูจาก id
            //แสดง category เดิม //input ให้เพิ่มใหม่ */}
          </li>
        ))}
      </ul>
      //แสดงผลแยก category อาจจะต้องใช้ reduce
    </div>
  );
}

export default App;
