import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav>
			<ul>
			<div className="container">
				<li>
					<Link to="/">
					<span className="navbar-brand mb-0 h1">Love Island - Home</span>
					</Link>
				</li>
				<li>
					<Link to="/voting">
					<button className="btn btn-primary">VOTE</button>
					</Link>
				</li>
				<li>
					<Link to="/leaderboard">
					</Link>
				</li>
				<li>
					<Link to="/islanders">
					</Link>
				</li>
				<li>
					<Link to="/profile">
					</Link>
				</li>
				<li>
					<Link to="/signuplogin">
					Sign Up/Log In
					</Link>
				</li>
			</div>
			</ul>
		</nav>
	);
};