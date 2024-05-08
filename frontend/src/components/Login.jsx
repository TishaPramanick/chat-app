import React, { useState } from 'react'
import {FormControl , FormLabel , Input , VStack  , InputGroup , InputRightElement , Button} from '@chakra-ui/react'
import { useRef } from 'react';

function Login() {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPwdRef = useRef("");
    const [show , setShow] = useState(false);
    const [showConfirm , setShowConfirm] = useState(false);


    const handleSumbit = async ()=>{
        const response  = await fetch("/api/user/login" , {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({
                email : emailRef.current.value,
                password : passwordRef.current.value
            })
        });

        const data = await response.json();

        console.log(data);
    };

  return (
    <VStack spacing="5px" color="black">
        
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

        <Button width="100%" margin="10px 0 0 0" backgroundColor="teal" color="white" onClick={handleSumbit}>
            Login
        </Button>
        <Button variant="solid" width="100%" margin="8px 0 0 0" backgroundColor="red" color="white" onClick={handleSumbit}>
            Google Auth
        </Button>
    </VStack>
  )
}

export default Login