import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink className="blog-logo" to="/">
            Realworld Blog
          </NavLink>
          <NavLink to="/">Sign In</NavLink>
          <NavLink className="signup-btn" to="/">
            Sign Up
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
