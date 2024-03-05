import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: #edede9;
	height: 50px;
	display: flex;
	justify-content: center;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow for depth */

	/* Optionally, you can transition the box shadow for a smoother effect */
	transition: box-shadow 0.3s ease-in-out;

	/* Add hover effect to make it more interactive */
	&:hover {
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
	}
`;
export const NavLink = styled(Link)`
	color: #42c333;
	display: flex;
	font-size: 20px;
	font-weight: bold;
	align-items: center;
	text-decoration: none;
	padding: 0 5rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #0B6889;
	}
	
`;