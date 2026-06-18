import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotificationDetails from "./pages/NotificationDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./pages/Notifications";
import Important from "./pages/Important";
import Stats from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

<Route
  path="/important"
  element={
    <ProtectedRoute>
      <Important />
    </ProtectedRoute>
  }
/>
<Route
  path="/stats"
  element={
    <ProtectedRoute>
      <Stats />
    </ProtectedRoute>
  }
/>

        <Route
          path="/notification/:id"
          element={
            <ProtectedRoute>
              <NotificationDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;