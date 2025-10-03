import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav>
			<ul>
			<div className="container">
				<li>
					<Link to="/">
					<span className="navbar-brand mb-0 h1">Love Island Home</span>
					</Link>
				</li>
				<li>
					<Link to="/voting">
					<button className="btn btn-primary">VOTE</button>
					</Link>
				</li>

			</div>
			</ul>
		</nav>
	);
};