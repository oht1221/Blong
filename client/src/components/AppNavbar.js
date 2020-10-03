import { Navbar,
    Container,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Button,
    Form } from 'reactstrap'
import React, { 
    Fragment,
    useEffect,
    useState,
    useCallback,
     } from 'react'
import {
    useSelector,
    useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginModal from './auth/LoginModal'
import { LOGOUT_REQUEST } from '../redux/types'
import JoinModal from './auth/JoinModal'

const AppNavbar = () => {   
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
    console.log(userRole, "UserRole");

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        })
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const addPost = () => {

    }

    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === 'Super' ? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success block text-white px-3" onClick={addPost}>
                        Add Post
                        </Link>
                    </Form>
                ) : "" }
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link>
                        <Button outline color="light" className="px-3" block>
                            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                        </Button>
                        </Link>
                    ) : (
                        <Button outline color="light" className="px-3" block>
                            <strong> No such user! </strong>
                        </Button>
                    )}
                </Form> 
            </NavItem>
            <NavItem>
                <Form clasName="col">
                    <Link onClick={onLogout} to="#">
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <NavItem>
                <JoinModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
        </Fragment>
    )
    
    return (
        <Fragment>
            <Navbar color='dark' expand='lg' className='sticky-top'>
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        Hong's blog, Blong
                    </Link>
                    <NavbarToggler onClick={handleToggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className='ml-auto d-flex justify-content-around' navbar>
                        { isAuthenticated ? authLink : guestLink }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );   
}

export default AppNavbar