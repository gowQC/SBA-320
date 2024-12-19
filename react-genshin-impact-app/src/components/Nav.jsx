import { Link } from "react-router";

export default function Nav() {
  return (
    <ul className="nav">
      <Link to="/">
        <div>Welcome Page</div>
      </Link>
      <Link to="/characters">
        <div>Find Characters!</div>
      </Link>
      <Link to="/bosses">
        <div>Find Bosses!</div>
      </Link>
      <Link to="/teambuilder">
        <div>Build Your Team!</div>
      </Link>
    </ul>
  );
}
