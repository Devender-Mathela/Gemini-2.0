import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context'
const Siderbar=()=> {

    const [extended, setExtended]=useState(false)

    const {onSent, prevPrompts,setRecentPrompt, newChat, setImage, setState,clearChat}=useContext(Context)

    const loadPrompt = async (item) => {
        setState(item.text);               // Fill input with previous text
        setImage(item.image || null);      // Restore image if any
        setRecentPrompt(item.text);        // Update recent prompt view
        await onSent(item.text);           // Trigger response with the text only
    };

    return (

    <div className='sidebar'>
      <div className='top'>
            <img onClick={()=>setExtended((prev)=>!prev)} className='menu' src={assets.menu_icon} alt=''/>
            <div  className="chat"> 
                <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt=''/>
                {extended?<p>New Chat</p>:null}
                
            </div>
            <div className='clear-chat'
            onClick={()=>clearChat()}
            >
            {extended?<p>Clear Chat</p>:null}
            </div>
            </div>
            {extended?
            <div className="recent">
                <p className='recent-title'>Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                        <div onClick={()=>{
                            loadPrompt(item)
                            console.log(item.text)
                        }} className="recent-entry">
                            <img src={assets.message_icon} alt=''/>
                            <p>{item.split(" ").slice(0, 10).join(" ")}...</p>
                        </div>
                    )
                })}
                
            </div>
            :null}

      </div>
      <div className="bottom">

        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt=''/>
            {extended?<p>Help</p>:null}   
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt=''/>
            {extended?<p>Activity</p>:null}   
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt=''/>
            {extended?<p>Settings</p>:null}  
        </div>
        
      </div>
    </div>
  )
}

export default Siderbar
