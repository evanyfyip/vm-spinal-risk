import React from "react";
import { Nav, NavLink, NavMenu } from "./elements";

const Navbar = () => {
	return (
		<>
			<Nav>
				{/* <NavMenu> */}
					<NavLink to="/" activeStyle>Home</NavLink>
					<NavLink to="/survey/patient" activeStyle>Survey</NavLink>
					<NavLink to="/about" activeStyle>About</NavLink>
					<NavLink to="/admin" activeStyle>Admin</NavLink>
				{/* </NavMenu> */}
			</Nav>
		</>
	);
};

export default Navbar;
