import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Layout from "./components/template/layout";
import Sidebar from "./components/template/sidebar";
import ModulePage from "./pages/Module";
import QuizzPage from "./pages/Quizz";
import BadgesPage from "./pages/Badges";
import { fakeGetUserInfo } from "./scripts/fakeApi";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFormations from "./pages/admin/AdminFormations";
import AdminCreateFormation from "./pages/admin/AdminCreateFormation";

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function loadUser() {
      if (!token) return null;
      try {
        const user = await fakeGetUserInfo(token);
        setUser(user);
      } catch (e) {
        console.error(e);
      }
    }
    loadUser();
  }, [token]);

  function handleLogin(newToken: string, newUser: User) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function handleRegister(newToken: string, newUser: User) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/login"
            element={
              !token ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !token ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            element={
              token ? (
                <Sidebar
                  token={token}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }>
            <Route
              path="/dashboard"
              element={
                token ? (
                  <Dashboard
                    token={token}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/formation/:formationId/module/:moduleId"
              element={token ? <ModulePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/formation/:formationId/quizz/:quizzId"
              element={token ? <QuizzPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mes-badges"
              element={
                token ? <BadgesPage token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                user?.role === "admin" && token ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/formations"
              element={
                user?.role === "admin" && token ? (
                  <AdminFormations />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/formation/create"
              element={
                user?.role === "admin" && token ? (
                  <AdminCreateFormation />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Route>
          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
