import React from 'react'
import {Container , Box , Text , Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  return (
    <Container maxW='xl' centerContent>
      <Box d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w='100%'
      m="40px 0 10px 0"
      textAlign="center"
      borderRadius="10px">
        <Text fontSize="2xl" fontWeight="bold" color="teal">Chit Chat</Text>
      </Box>

      <Box d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w='100%'
      m="0px 0 15px 0"
      textAlign="center"
      borderRadius="10px">
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList mb="1rem">
          <Tab w="50%" onClick={()=>{navigate("/login")}}>Login</Tab>
          <Tab w="50%" onClick={()=>{navigate("/sign-up")}}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login></Login>
          </TabPanel>
          <TabPanel>
            <SignUp></SignUp>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  )
}

export default Home