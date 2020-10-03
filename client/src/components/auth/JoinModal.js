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
import { JOIN_REQUEST, CLEAR_ERROR_REQUEST } from '../../redux/types';


const JoinModal = () => {
    const [form, setValue] = useState({
        name: "",
        email: "",
        password:""
    });
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState('');
    const [localMsgColor, setLocalMsgColor] = useState('');
    const dispatch = useDispatch();
    const { errorMsg, successMsg } = useSelector((state) => state.auth);

    useEffect(() => {
        try{
            setLocalMsg(errorMsg);
            setLocalMsgColor('danger');
        }
        catch(e){
            console.error(e);
        }
    }, [errorMsg]);

    useEffect(() => {
        try{
            if(successMsg){
                setLocalMsg(successMsg);
                setLocalMsgColor('success');
                clearForm();
                //handleToggle();
            }
        }
        catch(e){
            console.error(e);
        }
    }, [successMsg]);

    const clearForm = () => {
        document.getElementById('userInfo').reset();
    }

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
        const { name, email, password } = form;
        const newUser = { name, email, password };
        console.log(newUser, "newUser");
        dispatch({
            type: JOIN_REQUEST,
            payload: newUser
        });
    }


    return (
        <div>
            <NavLink onClick={handleToggle} href="#" className="text-white">
                Join
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Join</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color={localMsgColor}>{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit} id="userInfo">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={onChange}
                            />
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Name"
                                onChange={onChange}
                            />
                            <Button color='dark' style={{marginTop: "2rem"}} block>
                                Join
                            </Button>
                        </FormGroup>
                   </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default JoinModal;