// import React from "react";
// import { Nav, NavLink, NavMenu } from "./elements";

// const Navbar = () => {
// 	return (
// 		<>
// 			<Nav>
// 				{/* <NavMenu> */}
// 					<NavLink to="/" activeStyle>Home</NavLink>
// 					<NavLink to="/survey/patient" activeStyle>Survey</NavLink>
// 					<NavLink to="/about" activeStyle>About</NavLink>
// 					<NavLink to="/TestPlot" activeStyle>Plots</NavLink>
// 					<NavLink to="/admin" activeStyle>Admin</NavLink>
// 				{/* </NavMenu> */}
// 			</Nav>
// 		</>
// 	);
// };

// export default Navbar;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
const Navbar = () => {
  return (
	<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" elevation = {30} 
							sx = {{bgcolor: 'white',
									}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

		  <img src={'/virginiamason.png'} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Button color="inherit" component={RouterLink} to="/" style={{ color: 'black' }}>Home</Button>
          <Button color="inherit" component={RouterLink} to="/about" style={{ color: 'black' }}>About</Button>
		      <Button color="inherit" component={RouterLink} to="/survey" style={{ color: 'black' }}>survey</Button>
          <Button color="inherit" component={RouterLink} to="/admin" style={{ color: 'black' }}>Admin</Button>
        </Toolbar>
      </Container>
    </AppBar>
	<Box sx={{ bgcolor: 'white', boxShadow: 2, zIndex: -1, position: 'relative', top: -10, left: 0, width: '100%', height: 10 }} />
    </Box>
  );
};

export default Navbar;

