import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";

function App() {
  const [isloggedin, setLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setloading] = useState(true);
  return (
    <div className="App">
      {isloggedin ? (
        <LoginPage
          setLoggedin={setLoggedin}
          setUserName={setUserName}
          loading={loading}
          setloading={setloading}
        />
      ) : (
        <Dashboard userName={userName} />
      )}
    </div>
  );
}

export default App;
