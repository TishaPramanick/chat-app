import React, { useState } from 'react'
import {FormControl , FormLabel , Input , VStack  , InputGroup , InputRightElement , Button} from '@chakra-ui/react'
import { useRef } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"

function SignUp() {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPwdRef = useRef("");
    const [show , setShow] = useState(false);
    const [showConfirm , setShowConfirm] = useState(false);
    const [pic , setPic] = useState(null);


    const navigate = useNavigate();
    const uploadPhoto = (photo)=>{
        setPic(photo);
        
    };

    const handleSubmit = async()=>{
        const formData = new FormData();
        formData.append("pic" , pic);

       const {data} =  await axios.post("/api/user/upload-pic" , formData , {
            headers : {"Content-Type": "multipart/form-data"}
        });

        let payload = {
            name : nameRef.current.value,
            email : emailRef.current.value ,
            password : passwordRef.current.value
        }

        if(data.name)
        {
           payload = {...payload , pic : data.name}
        }

        const persistData = await axios.post("/api/user/sign-up" , payload);
        navigate("/chat");

    }
  return (
    <VStack spacing="5px" color="black">
        <FormControl id='name' isRequired>
            <FormLabel color="gray">Name</FormLabel>
            <Input
            placeholder='Enter Your Name'
            ref={nameRef}
            defaultValue={nameRef.current.value}/>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel color="gray">Email</FormLabel>
            <Input
            placeholder='Enter Your Email'
            ref={emailRef}
            defaultValue={emailRef.current.value}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel color="gray">Password</FormLabel>
            <InputGroup>
                <Input
                type={show ? "text" : "password"}
                placeholder='Enter Your Password'
                ref={passwordRef}
                defaultValue={passwordRef.current.value}/>
                <InputRightElement width="4.5rem">
                    <Button h="1.7rem" size="sm" onClick={()=>{(show) ? setShow(false) : setShow(true)}}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl> 

        <FormControl id='confirmPwd' isRequired>
            <FormLabel color="gray">Confirm Password</FormLabel>
            <InputGroup>
                <Input
                type={showConfirm ? "text" : "password"}
                placeholder='Confirm Your Password'
                ref={confirmPwdRef}
                defaultValue={confirmPwdRef.current.value}/>
                <InputRightElement width="4.5rem">
                    <Button h="1.7rem" size="sm" onClick={()=>{(showConfirm) ? setShowConfirm(false) : setShowConfirm(true)}}>
                        {showConfirm ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl> 

        <FormControl id='pic'>
            <FormLabel color="gray">Upload Your Photo</FormLabel>
            <Input type='file' p={1.5} accept='image/*' onChange={(e)=> uploadPhoto(e.target.files[0])}></Input>
        </FormControl>

        <Button width="100%" margin="8px 0 0 0" backgroundColor="teal" color="white" onClick={handleSubmit}>
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp