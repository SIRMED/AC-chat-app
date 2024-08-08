import { useState, useEffect } from "react";
import ACLogo from "../imgs/ac.svg";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import socket from "../SocketConnection";

const Room = () => {

    const { room, ownCNO } = useLocation()?.state;
    const [otherCNO, setOtherCNO] = useState(false);
    const [messages, setMessages] = useState([]);

    console.log(room, ownCNO);
    useEffect(() => {
        setOtherCNO(room.people.filter((person) => person.split(" ")[0] !== ownCNO)[0].split(" ")[0]);
    })

    useEffect(() => {
        document.getElementById("msg").scrollTop = document.getElementById("msg").scrollHeight + 100;
    }, [messages])

    socket.emit("join/room", room)

    function sendMsg(e) {
        e.preventDefault();
        
        if(e.target[0].value === "") return;

        socket.emit("send-message", {
            room,
            msg: e.target[0].value,
            from: ownCNO
        })
        setMessages([...messages, { msg: e.target[0].value, from: ownCNO }])
        e.target[0].value = "";
    }

    socket.on("receive-message", ({ msg, from }) => {
        setMessages([...messages, { msg, from }])
    })

    return (<>
        <div className="chat-main">
            <div>

                <div className="info">
                    <img src={ACLogo} alt="AC-Logo" />
                    <h1>{otherCNO}</h1>
                </div>

                <div className="messages" id="msg">
                    {messages.map((message, index) => {
                        return (<>
                            <motion.div 
                                key={index} 
                                className={`message ${message.from === ownCNO && "own" || ""}`}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}

                            >
                                <p>{message.msg}</p>
                            </motion.div>
                            <br/>
                        </>)
                    })}
                </div>

                <form onSubmit={(e) => sendMsg(e)} >
                    <input type="text" placeholder="Type smthn..." />
                </form>

            </div>
        </div>
    </>)
}

export default Room;