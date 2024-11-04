import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import styled from 'styled-components';
import DocumentationView from './views/DocumentationView';
import TimersView from './views/TimersView';

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #234;
  text-align: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: f5f5f5;
  gap: 20px;
`;

const ButtonLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-size: 0.6rem;
  color: white;
  background-color: #007bff;
  padding: 15px 25px
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  width: 140px;
  height: 25px;
  background-color: #e0e0e0;
  border: 2px solid #ccc;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
    transform: scale(1.05);
  }

  &.active {
    background-color: #c0c0c0;
  }


`;

const PageIndex = () => {
    return (
        <Container>
            <Title>ANIKET'S TIMECLOCK ASSIGNMENT</Title>
            <NavList>
                <NavItem>
                    <ButtonLink to="/">Timers</ButtonLink>
                </NavItem>
                <NavItem>
                    <ButtonLink to="/docs">Documentation</ButtonLink>
                </NavItem>
            </NavList>
            <Outlet />
        </Container>
    );
};

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        children: [
            {
                index: true,
                element: <TimersView />,
            },
            {
                path: '/docs',
                element: <DocumentationView />,
            },
        ],
    },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
