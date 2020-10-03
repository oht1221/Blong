import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    FormGroup,
    Input,
    Label,
    ModalBody,
    ModalHeader,
    NavLink,
    Modal,
    Alert,
    Form,
    Button } from 'reactstrap'
import { LOGIN_REQUEST, CLEAR_ERROR_REQUEST } from '../../redux/types';

const LoginModal = () => {
    const [form, setValue] = useState({
        email: "",
        password: ""
    })
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState('');
    const dispatch = useDispatch();
    const { errorMsg } = useSelector((state) => state.auth);
    useEffect(() => {
        try{
            setLocalMsg(errorMsg)
        }
        catch(e){
            console.error(e);
        }
    }, [errorMsg])

    const handleToggle = () => {
        setModal(!modal);
        dispatch({
            type: CLEAR_ERROR_REQUEST
        });
    }

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password };
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        })
    }
    return (
        <div>
            <NavLink onClick={handleToggle} href="#" className="text-white">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label form="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label form="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                onChange={onChange}
                            />
                            <Button color='dark' style={{marginTop: "2rem"}} block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default LoginModal;