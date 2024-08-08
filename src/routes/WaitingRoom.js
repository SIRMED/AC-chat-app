import { useLocation, useNavigate } from "react-router-dom";
import ACLogo from "./../imgs/ac.svg"
import { motion } from "framer-motion";
import AuthenticateNetwork from "../global/AuthenticateNetwork";
import { useEffect, useState } from "react";
import socket from "../SocketConnection";

const WaitingRoom = () => {

    const nav = useNavigate()
    const { state: { cno } } = useLocation();
    const [roomFound, setRoomFound] = useState(false);
    const [otherUsers, setOtherUsers] = useState([]);
    const [messages, setMessages] = useState([])
    const [openMessagePanelId, setOpenMessagePanelId] = useState(null)
    const [yourMessages, setYourMessages] = useState([])
    const [userDisconected, setUserDisconected] = useState([])

    useEffect(() => {
        updateOnlineUsersList()
        socket.emit("join/waiting-room", cno)

        socket.on("recive-message", ({ from, message }) => {
            console.log("message recived")
            const senderMessageObj = messages.find(message => message.from === from)
            if (senderMessageObj) {
                var prevMessages = senderMessageObj.messages
                prevMessages.push({ "message": message, "t": new Date().getTime() })
                const updatedData = messages.map(obj => {
                    if (obj.from === from) {
                        return { "from": from, "messages": prevMessages };
                    }
                    return obj;
                });

                setMessages(updatedData)
            } else {
                var tempMessages = messages

                tempMessages.push({
                    "from": from,
                    "messages": [
                        {
                            "message": message,
                            "t": new Date().getTime()
                        }
                    ]
                })

                setMessages(tempMessages)
            }
        })

        socket.on("user-discon", (id) => {
            var temp = userDisconected
            temp.push(id)
            setUserDisconected(temp)
        })

        return () => {
            socket.off("recive-message", () => {
                console.log("cleanup called")
            }); // Cleanup listener
        };
    }, [])

    function updateOnlineUsersList() {
        fetch("http://localhost:7000/get-waiting-room")
            .then(res => { return res.json() })
            .then(({ waitingRoom }) => {
                setOtherUsers(waitingRoom.filter(id => {
                    return id.split(" ")[0] !== cno
                }))
            })

        setTimeout(() => {
            updateOnlineUsersList()
        }, 1000);
    }

    function sendMessage(message, to) {
        const yourSentMessagesToThisId = yourMessages.find(item => item.to === to)
        socket.emit("send-message", {
            id: to,
            message: message
        })

        if (yourSentMessagesToThisId) {
            var prevMessages = yourSentMessagesToThisId.messages
            prevMessages.push({ "message": message, "t": new Date().getTime() })
            const updatedData = yourMessages.map(obj => {
                if (obj.to === to) {
                    return { "to": to, "messages": prevMessages };
                }
                return obj;
            });

            setYourMessages(updatedData)
        } else {
            var tempMessages = messages

            tempMessages.push({
                "to": to,
                "messages": [
                    {
                        "message": message,
                        "t": new Date().getTime()
                    }
                ]
            })

            setYourMessages(tempMessages)
        }
    }

    function getMessages(id) {
        var combinedMessages = []
        var messagesRecivedList = messages?.find(obj => obj?.from === id)?.messages
        var messagesSentList = yourMessages?.find(obj => obj?.to === id)?.messages

        messagesRecivedList?.forEach((recivedMsg) => {
            combinedMessages.push({
                message: recivedMsg.message,
                from: id,
                t: recivedMsg.t
            })
        })

        messagesSentList?.forEach((recivedMsg) => {
            combinedMessages.push({
                message: recivedMsg.message,
                from: "self",
                t: recivedMsg.t
            })
        })

        combinedMessages.sort((a, b) => a.t - b.t);

        return combinedMessages
    }

    return (<AuthenticateNetwork>
        <motion.div className="main no-padding" style={{ height: "80vh", width: "90vw", minWidth: "400px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <div className="panel left">
                <div className="header">
                    <img src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${cno}`} alt="Profile Pic" />
                    <h1>{cno}</h1>
                </div>

                <div>
                    {otherUsers.map((userId) => {
                        return <div key={userId} className={`other-user ${openMessagePanelId === userId ? "open" : ""}`} onClick={() => {
                            setOpenMessagePanelId(userId)
                        }} >
                            <h1>
                                {userId.split(" ")[0]}
                            </h1>
                            <p>
                                {messages.map((message) => {
                                    if (message.from !== userId) {
                                        return
                                    }

                                    return message.messages[message.messages.length - 1].message
                                })}
                            </p>
                        </div>
                    })}
                </div>
            </div>

            <div className="panel right">

                {!openMessagePanelId && <div className="center">
                    <h1 style={{ textAlign: "center" }}>
                        Select a user to send messages to
                    </h1>
                </div>}

                {openMessagePanelId && !userDisconected.includes(openMessagePanelId) && <div style={{ height: "100%" }}>
                    <h1 style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "10px 20px",
                        backdropFilter: "blur(10px)"
                    }}>
                        {openMessagePanelId.split(" ")[0]}
                    </h1>

                    <div style={{ padding: "10px 20px", height: "90%", overflowY: "hidden", overflowX: "hidden" }}>

                        <div style={{ height: "calc(100% - 50px)", overflowY: "scroll" }}>
                            {getMessages(openMessagePanelId)?.map(msg => {
                                return <>
                                    <div className={`message ${msg.from === "self"}`}>
                                        <p>{msg.message}</p>
                                    </div>
                                    <br />
                                </>
                            })}
                        </div>

                        <input type="text" id="msg-input" placeholder="Your message (press enter to send)" onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage(e.target.value, openMessagePanelId);
                                e.target.value = ""
                            }
                        }} />

                    </div>
                </div>}

                {userDisconected.includes(openMessagePanelId) && <div>
                    <div className="center">
                        <h1 style={{ textAlign: "center" }}>
                            This session has ended
                        </h1> <br />
                        <p style={{ textAlign: "center" }}>
                            {openMessagePanelId.split(" ")[0]} disconected <br />
                            <i>maybe because he didn't like you :)</i>
                        </p>
                    </div>
                </div>}

            </div>

        </motion.div>
    </AuthenticateNetwork>)
}

export default WaitingRoom;

