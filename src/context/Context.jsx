import { createContext, useEffect, useState } from "react";
import { main,sendImageAndPromptToGemini } from "../config/gemini";

export const Context=createContext();

 const ContextProvider =(props)=>{

    const [state, setState]=useState("")
    const [recentPrompt, setRecentPrompt]=useState("")
    const [prevPrompts, setPrevPrompts]=useState([])
    const [showResult, setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData, setResultData]=useState("")

    const [image, setImage]=useState(null)

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const clearChat=()=>{
        setState("");
        setImage(null);
        setResultData("");
        setRecentPrompt(null);
        setShowResult(false);
        setPrevPrompts([]);
        localStorage.removeItem("prompts");
    }

    const onSent=async(prompt)=>{

        // console.log(prompt)
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;

        if (image) {
            // if image selected, send image + prompt
            response = await sendImageAndPromptToGemini(prompt || state, image);
            setPrevPrompts((prev) => [
                ...prev,
                {
                text: prompt || state,
                image: image, // include the image in the object
                },
            ]);

            setRecentPrompt(prompt || state);
            // optionally clear image after send
            setImage(null);
        }

        
        else {
      // text only
        if (prompt !== undefined) {
            setPrevPrompts((prev) =>
                prev.includes(prompt) ? prev : [...prev, prompt]
            );

            response = await main(prompt);
            
        } else {
            setPrevPrompts((prev) => [...prev, state]);
            setPrevPrompts((prev) =>
                prev.includes(state) ? prev : [...prev, state]
            );
            response = await main(state);
            }
        }
        
        
        let responseArray=response.split('**');
        let newResponse='';
        for(let i=0; i<responseArray.length;i++){
            if(i===0 || i%2!=1){
                newResponse+=responseArray[i]
            } 
            else{
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray =newResponse2.split(" ");
        for (let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i]
            delayPara(i,nextWord+" ")
        }
       
        setLoading(false)
        setState('')
       
       console.log(response)
       
    }

   useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("recentPrompt"));
        if (saved && Array.isArray(saved)) {
            setPrevPrompts(saved);
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem("recentPrompt",JSON.stringify(prevPrompts))
    },[prevPrompts])

    
    

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        state,
        setState,
        onSent,
        newChat,
        image,
        setImage,
        clearChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
 }

 export default ContextProvider