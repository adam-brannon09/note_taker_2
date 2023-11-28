
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoteScreen from "./pages/NoteScreen";
import PrivateRoute from "./components/PrivateRoute";
// react router 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// bring in toastify
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/note" element={<PrivateRoute />}>
            <Route path="/note" element={<NoteScreen />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
