import React from "react";
// import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  background: #141414;
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 200px;
  display: flex;
  justify-content: center;
`;
const GnbWrap = styled.div`
  width: 200px;
  color: #fff;
`;
const Gnb = styled.span`
  margin: 0 20px;
  font-size: 18px;
  text-decoration: none;
  color: #fff;
`;
const HeaderRight = styled.div`
  width: 400px;
  height: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
  }
  input[type="text"] {
    width: 270px;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding-left: 15px;
    &:focus {
      outline: none;
    }
  }
  input[type="submit"] {
    height: 40px;
    border-radius: 5px;
    padding: 0 10px;
    background: transparent;
    color: rgb(229, 9, 20);
    font-weight: 400;
    border: 1px solid rgb(229, 9, 20);
    transition: 0.3s;
    &:hover {
      background: rgb(229, 9, 20);
      color: #fff;
    }
  }
`;
const Navigation = () => {
  const navigate = useNavigate();
  const searchStart = (event) => {
    event.preventDefault();
    navigate(`?q=${event.target[0].value}`);
    console.log(event);
  };
  return (
    <>
      {/* <Navbar bg="black" style={{ background: "#141414 !important" }}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              width={100}
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">
                <Link className="nav-item" to="/">
                  HOME
                </Link>
              </Nav.Link>
              <Nav.Link href="#action2">
                <Link className="nav-item" to="/movies">
                  MOVIES
                </Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Header>
        <HeaderLeft>
          <Logo as={"a"} href="/">
            <img
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              width={130}
            />
          </Logo>
          <GnbWrap>
            <Gnb as={"a"} href="/">
              Home
            </Gnb>
            <Gnb as={"a"} href="/movies">
              Movies
            </Gnb>
          </GnbWrap>
        </HeaderLeft>
        <HeaderRight>
          <form onSubmit={searchStart}>
            <input type="text" placeholder="Search" />
            <input type="submit" value={"Search"} />
          </form>
        </HeaderRight>
      </Header>
    </>
  );
};

export default Navigation;
