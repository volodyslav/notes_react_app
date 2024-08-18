import { useSquid } from "@squidcloud/react"
import { RiRobot2Line } from "react-icons/ri";
import { useState } from "react"
import { useTheme } from "../providers/ThemeProvider";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ButtonLoading from "../utils/ButtonLoading";

const ChatBot = () => {
    const [text, setText] = useState("");
    const [responceShow, setResponceShow] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const squid = useSquid();

    const {theme} = useTheme();

    // Function to send a question to the AI chatbot
    const askQuestion = async () => {
        // Reset the responce if the text changes
        try{
            if (!text) return;
            setLoading(true);
            const response = await squid.executeFunction('askQuestion', text );
            setResponceShow(response);
            setText("");
            setLoading(false);
        }catch (error){
            console.error("Error executing AI function:", error);
            setResponceShow("An error occurred while processing your request. Please try again.");
        }
        
    };

    // Show input
    const onShowInput = () => {
        setShowInput(true);
    }
    
    // Hide input
    const onHideInput = () => {
        setShowInput(false);
        setLoading(false);
    }

  return (
    <div className="relative">
        <div className={`${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"} ${showInput ? "visible chat-bot" : "chat-bot-close"} w-[250px] md:min-w-[500px] max-h-[400px] md:max-h-[400px] p-6 absolute right-0 bottom-24 z-50 rounded-2xl  border-2 border-yellow-800`}>
            {responceShow && <textarea readOnly className=" text-black min-w-full h-[200px] p-2 text-xl ">{responceShow}</textarea>}
            <div className="flex space-x-2 items-center justify-center ">
                {!loading && <textarea  maxLength={100} minLength={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask question about your notes" className={`shadow  text-xl  duration-700 ease-in-out appearance-none my-4 p-2 border-2 resize-none rounded max-w-fit mb-3  leading-tight focus:outline-none ${theme === "dark" ? "bg-success  border-success" : "bg-primary  border-secondary"}`} />}
                {!loading && <button disabled={text.length < 10} title="ask question" onClick={askQuestion} className={`p-4 hover:scale-110 duration-700 ease-in-out  rounded-2xl ${theme === "dark" ? "bg-success text-secondary" : "bg-secondary text-success"} text-xl`}>Ask</button>}
                
            </div> 
            <div className="mt-1 ">{loading && <ButtonLoading text="Writing..."/>}</div>
        </div>
        
        <button  title="chat bot" className={`p-4 hover:scale-110 duration-700 ease-in-out border-2 border-yellow-800 rounded-2xl ${theme === "dark" ? "bg-secondary text-success" : "bg-success text-secondary"} text-5xl`}>{showInput ? <IoIosCloseCircleOutline onClick={onHideInput} /> : <RiRobot2Line onClick={onShowInput} />}</button>
    </div>
  )
}

export default ChatBot