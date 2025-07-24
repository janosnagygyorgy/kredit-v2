import type { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="flex p-1">
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
      className={`rounded-lg p-2 mx-1 text-link-text
        ${isActive ? "bg-primary" : "bg-link-background"}`}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
}

export default Navbar;
