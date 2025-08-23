import React, { useContext, useRef } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main=()=> {

    
    const {onSent, recentPrompt, showResult, loading, resultData, setState, state, image, setImage}=useContext(Context)

    const fileInputRef=useRef(null)

    const imageSearch=()=>{
         fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            // setState(file.name)
        // console.log('Selected file:', file.name);
        // Do something with the file (upload or preview)
        }
    };


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt=''/> 
        </div>
        <div className="main-container">

            {!showResult
            ?<>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")
                    }>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt=''/>
                    </div>
                    <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt=''/>
                    </div>
                    <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt=''/>
                    </div>
                    <div className="card" onClick={() => onSent("Improve the readability of the following code")}>
                        <p>Improve the readbility of the following code</p>
                        <img src={assets.code_icon} alt=''/>
                    </div>
                </div>
            </>
            :<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt=''/>
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon}/>
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<div dangerouslySetInnerHTML={{ __html: resultData }} />
                    }       
                </div>
            </div>
            }

            

            <div className="main-bottom">
                <div className="search-box">
                    
                    <input 
                    onChange={(e)=>setState(e.target.value)}
                    value={state}
                    type='text' 
                    placeholder='Enter a prompt here'/>
                    <div>
                        <div>
                            <img onClick={imageSearch} src={assets.gallery_icon} alt="upload" style={{cursor:'pointer'}} />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        
                        {state && (
                            <img
                            onClick={() => onSent()}
                            src={assets.send_icon}
                            alt="send"
                            />
                        )}
                       
                    </div>
                </div>

                         {image && (
                            <div style={{ marginTop: "10px", textAlign: "left" }}>
                            <p style={{ fontSize: "14px", marginBottom: "5px" }}>📸 Selected Image:</p>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                style={{ maxWidth: "150px", borderRadius: "8px", border: "1px solid #ccc" }}
                            />
                            </div>
                        )}

                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
      
    </div>
  )
}

export default Main
