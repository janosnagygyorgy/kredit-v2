import type { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="flex">
        <NavigationLink to="/home">Főoldal</NavigationLink>
        <NavigationLink to="/settings">Beállítások</NavigationLink>
        <NavigationLink to="/help">Súgó</NavigationLink>
      </div>
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
    <div
      className={`flex items-center h-8 rounded-lg p-2 mr-1 text-text border-1
        ${isActive ? "bg-highlight border-text" : "border-link-highlight"}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
}

export default Navbar;
