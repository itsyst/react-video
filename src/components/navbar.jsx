import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
 	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					VideoX
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<NavLink className="nav-item nav-link" to="/movies">
							Movies
						</NavLink>
						<NavLink className="nav-item nav-link" to="/customers">
							Customers
						</NavLink>
						<NavLink className="nav-item nav-link" to="/rentals">
							Rentals
						</NavLink>
					</ul>
					{/* <form className="d-flex">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button
							className="btn btn-outline-primary"
							type="submit"
						>
							Search
						</button>
					</form> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
