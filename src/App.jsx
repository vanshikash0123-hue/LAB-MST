import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // Post state
  const [postDeleted, setPostDeleted] = useState(false);

  // Login
  const login = (role) => {
    if (username.trim() === "") {
      alert("Please enter username");
      return;
    }

    setUser({
      username: username,
      role: role,
    });

    // Reset post when a new user logs in
    setPostDeleted(false);
  };

  // Delete Post - Admin only
  const deletePost = () => {
    setPostDeleted(true);
    alert("Post deleted successfully!");
  };

  // Logout
  const logout = () => {
    setUser(null);
    setUsername("");
  };

  return (
    <div className="app">

      {/* ================= LOGIN PAGE ================= */}
      {user === null ? (
        <div className="login-box">

          <h1>Login</h1>

          <p>Enter your username</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="buttons">

            <button onClick={() => login("Admin")}>
              Login as Admin
            </button>

            <button onClick={() => login("Viewer")}>
              Login as Viewer
            </button>

          </div>

        </div>
      ) : (

        /* ================= AFTER LOGIN ================= */
        <div className="welcome-box">

          <h1>
            Welcome, {user.username} ({user.role})
          </h1>

          {/* ================= POST ================= */}
          <div className="post-box">

            <h2>Post</h2>

            {!postDeleted ? (
              <>
                <p>This is my sample post.</p>

                {/* ADMIN ONLY */}
                {user.role === "Admin" && (
                  <button
                    className="delete-btn"
                    onClick={deletePost}
                  >
                    Delete Post
                  </button>
                )}
              </>
            ) : (
              <p className="deleted-message">
                Post has been deleted.
              </p>
            )}

          </div>

          {/* ================= VIEWER ================= */}
          {user.role === "Viewer" && (
            <p className="readonly">
              Read-only access
            </p>
          )}

          {/* ================= LOGOUT ================= */}
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default App;