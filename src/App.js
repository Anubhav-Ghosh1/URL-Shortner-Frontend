import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./Error/ErrorPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import URL from "./components/URL/Home";
import URLDetails from "./components/URL/URLDetails";
import Home from "./components/URL/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import RedirectURL from "./components/URL/RedirectURL";
import CreateURL from "./components/URL/CreateURL";

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* <div>
                <NavBar />
            </div> */}
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create/:username" element={<Home />} />
          <Route path="/create" element={<CreateURL />} />
          <Route path="/url/:urlId" element={<URLDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:url" element={<RedirectURL />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
