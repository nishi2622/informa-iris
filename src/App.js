import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";

function App() {
  const [isloggedin, setLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  // const [loading, setloading] = useState(true);
  return (
    <div className="App">
      {isloggedin ? (
        <Dashboard userName={userName} />
      ) : (
        <LoginPage
          setLoggedin={setLoggedin}
          setUserName={setUserName}
          // loading={loading}
        />
      )}
    </div>
  );
}

export default App;
