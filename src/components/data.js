import axios from "axios";

export const fetchUser = async () => {
  try {
    const response = await axios.get(https://reqres.in/api/users?page=2);
    const data = response.data
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
