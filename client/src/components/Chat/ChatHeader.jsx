import React, { useEffect } from "react";
import Avatar from "../common/Avatar";
import {MdCall} from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs"
import { useStateProvider } from "@/context/StateContext";

function ChatHeader() {
  const[{currentChatUser}] = useStateProvider();
  useEffect(()=>{
    console.log(currentChatUser);
  },[])
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex item-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser?.profilePicture}/>
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">ONLINE/OFFLINE</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-panel-header-icon cursor-pointer text-xl" title='Audio Call'/>
        <IoVideocam className="text-panel-header-icon cursor-pointer text-xl" title='Video Call'/>
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" title='Search'/>
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" title='Settings'/>
      </div>
    </div>
  );
}

export default ChatHeader;
