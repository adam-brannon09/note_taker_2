import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoteScreen from "./pages/NoteScreen";
import EditScreen from "./pages/EditScreen";
import AllEntries from "./pages/AllEntries";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
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
          <Route path="/edit/:noteId" element={<EditScreen />} />
          <Route path="/all-entries" element={<AllEntries />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>

  );
}

export default App;
