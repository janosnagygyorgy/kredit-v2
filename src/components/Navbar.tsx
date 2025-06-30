import type { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <NavigationLink to="/home">Home</NavigationLink>
        <NavigationLink to="/settings">Settings</NavigationLink>
      </ul>
    </nav>
  );
}

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
}

function NavigationLink({ to, children }: NavigationLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
