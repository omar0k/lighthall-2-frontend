import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    navigate("/" + userName);
  };
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={userName}
        placeholder="Enter username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};
export default Welcome;
