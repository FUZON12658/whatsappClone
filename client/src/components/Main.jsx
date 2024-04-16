import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGE_ROUTE, HOST } from "@/utils/ApiRoutes";
import Chat from "./Chat/Chat";
import {  io } from "socket.io-client";

function Main() {
  const router = useRouter()
  const socket = useRef()
  const [redirectLogin ,setRedirectLogin] = useState(false);
  const [{userInfo, currentChatUser},dispatch] = useStateProvider();
  const [socketEvent, setSocketEvent] = useState(false)
  useEffect(()=>{
    if(redirectLogin) router.push("/login");
  },[redirectLogin])
  onAuthStateChanged(firebaseAuth, async(currentUser)=>{
    if(!currentUser){
      setRedirectLogin(true);
    }
    if(!userInfo && currentUser?.email){
      const {data} = await axios.post(CHECK_USER_ROUTE, {email:currentUser.email})

      const {id, name, email, profilePicture:profileImage,status} = data.data;
      dispatch({type:reducerCases.SET_NEW_USER, newUser: true});
      dispatch({
        type:reducerCases.SET_USER_INFO, userInfo:{
          id, name, email, profileImage , status,
        }
      })
      if(!data.status){
        router.push("/login")
      }  
    }
  })

  useEffect(()=>{
    if(userInfo){
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({type:reducerCases.SET_SOCKET, socket})
    }
  },[userInfo])

  useEffect(()=>{
    if(socket.current && !socketEvent ){
      socket.current.on("msg-receive",(data)=>{
        dispatch({
          type:reducerCases.ADD_MESSAGE,
          newMessage:{
            ...data.message,
          }
        })
      })
    }
  },[socket.current])

  useEffect(()=>{
    console.log("Hello");
    const getMessages = async () =>{
      const {data:{messages}} = await axios.get(`${GET_MESSAGE_ROUTE}/${userInfo.id}/${currentChatUser.id}`);
      dispatch({type:reducerCases.SET_MESSAGES, messages})
    };
    if(currentChatUser?.id)
      getMessages();
  },[currentChatUser])

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {
          currentChatUser ? <Chat /> : <Empty />
        }
      </div>
    </>
  );
}

export default Main;
