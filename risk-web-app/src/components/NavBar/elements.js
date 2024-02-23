import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: #a4d334;
	height: 50px;
	display: flex;
	justify-content: center;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
`;

export const NavLink = styled(Link)`
	color: #747c7c;
	display: flex;
	font-size: 20px;
	font-weight: bold;
	align-items: center;
	text-decoration: none;
	padding: 0 5rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #4d4dff;
	}
`;