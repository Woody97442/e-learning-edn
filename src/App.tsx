import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Layout from "./components/template/layout";
import Sidebar from "./components/template/sidebar";

export default function App() {
  const [token, setToken] = React.useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [, setUser] = React.useState<User | null>(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  });

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
          <Route element={<Sidebar onLogout={handleLogout} />}>
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
