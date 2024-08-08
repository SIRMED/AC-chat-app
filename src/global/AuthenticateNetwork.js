import { useEffect, useState } from "react";
import ACLogo from "./../imgs/ac.svg"
// import OK from "./../imgs/ok.png"
import { AnimatePresence, motion } from "framer-motion";

const AuthenticateNetwork = ({ children }) => {

    const aitchisonPublicIP = "202.59.75.2"
    // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [validityConfirmed, setValidityConfirmed] = useState("unchecked");
    const [exitAnimationForLogo, setExitAnimationForLogo] = useState({ opacity: 0, scale: 0.95 });

    useEffect(() => {
        // console.log("Checking for network validity");
        // if(!isAuthenticated) {
        //     fetch("https://api.ipify.org/?format=json")
        //     .then(res => res.json())
        //     .then(d => {
        //         var userIP = d.ip;
        //         console.log("User IP: " + userIP);
        //         // if (userIP === aitchisonPublicIP) {
        //         if (userIP) {
        //             localStorage.setItem("isAuthenticated", userIP);
        //             setTimeout(() => {
        //                 setValidityConfirmed(true);
        //                 setTimeout(() => {
        //                     setIsAuthenticated(true);
        //                 }, 2000);
        //             }, 1000);
        //         } else {
        //             setExitAnimationForLogo(null)
        //             setTimeout(() => {
        //                 setIsAuthenticated(false);
        //                 setValidityConfirmed(false);
        //             }, 2000);
        //             localStorage.setItem("isAuthenticated", false);
        //         }

        //     })
        // } else {

        // }
    })


    //         setExitAnimationForLogo({
    //             opacity: 0,
    //             scale: 0.95,
    //         })

    return (<>
        {isAuthenticated && isAuthenticated !== "unchecked" && children}

        {isAuthenticated === "unchecked" && <>
            <div className="main" style={{ height: "60vh", width: "20vw", minWidth: "400px" }}>
                <AnimatePresence mode="wait">
                    <motion.div key={validityConfirmed}>

                        {validityConfirmed === "unchecked" && <motion.div className="center-height center-text">
                            <motion.img src={ACLogo} alt="AC Logo" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={exitAnimationForLogo} />
                            <br />
                            <br />
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 10 }}>
                                Checking for College Network
                            </motion.h1>
                        </motion.div>}

                        {validityConfirmed && validityConfirmed !== "unchecked" && <motion.div className="center-height center-text">
                            {/* <motion.img src={OK} alt="Check Mark" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} /> */}
                            <br />
                            <br />
                            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                                Identity Verified
                            </motion.h1>
                        </motion.div>}

                        {!validityConfirmed && <motion.div className="center-height center-text">
                            <motion.img src={ACLogo} alt="AC LOGO" />
                            <br />
                            <br />
                            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                                Access is only granted on campus network
                            </motion.h1>
                        </motion.div>}

                    </motion.div>
                </AnimatePresence>
            </div>
        </>}

    </>)
}

export default AuthenticateNetwork;