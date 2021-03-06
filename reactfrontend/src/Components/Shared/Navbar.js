import { AppBar, Toolbar, Link, Button } from '@material-ui/core';
import styled from "styled-components";
import LoginButton from '../Navbar/login-button';
import LogoutButton from '../Navbar/logout-button';
import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from '../Navbar/sign-up-button';

const StyledButton = styled(Button)`
  margin-left: 2%;
`;

const AppName = styled.div`
  flex-grow: 1;
`;


function NavBar() {
  const { isAuthenticated } = useAuth0();
  

  return (
    <AppBar style={{ backgroundColor: 'white' }} position='static'>
      <Toolbar>
        <AppName>
          <Button href='/'>StockInfoApp</Button>
        </AppName>
        <StyledButton href='/lists'>My Lists</StyledButton>
        <StyledButton href='/news'>News</StyledButton>
        <StyledButton href='/trending'>Todays Trending</StyledButton>
        <StyledButton href='/congress'>Congress Trades</StyledButton>
        <StyledButton href='/support'>Support Me</StyledButton>
        {isAuthenticated ? <StyledButton href='/profile'>My Profile</StyledButton> : <SignupButton />}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;