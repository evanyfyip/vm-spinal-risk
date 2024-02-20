import React from "react";
import { Nav, NavLink, NavMenu } from "./elements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/home" activeStyle>
						Home
					</NavLink>
					<NavLink to="/survey/patient" activeStyle>
						Contact Us
					</NavLink>
					<NavLink to="/admin" activeStyle>
						Blogs
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
