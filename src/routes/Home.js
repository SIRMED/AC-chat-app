import ACLogo from "./../imgs/ac.svg"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthenticateNetwork from "../global/AuthenticateNetwork";

const Home = () => {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const cno = document.getElementById("cno").value;
        
        if(cno === "" || cno === null || cno === undefined || cno.length !== 5) {
            alert("Please enter a valid School No.");
            return;
        } else {
            navigate("/waiting-room", { state: { cno: cno } });
        }
    }

    return(<AuthenticateNetwork>
        <div className="divided-main">
            <motion.div className="main" style={{ height: "60vh", width: "20vw", minWidth: "400px" }} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <div className="center">
                    <motion.img src={ACLogo} alt="Aitchison College Logo" initial={{ opacity: 0,  scale: 1.2 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{scale: 0.95}} />
                </div>
            </motion.div>

            <motion.div className="main" style={{ height: "60vh", width: "20vw", minWidth: "400px", textAlign: "center" }} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <div className="center" style={{ width: "90%" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{scale: 0.95}}>
                        <h1 className="f-g">
                            Hello 👋
                        </h1>
                        <br />
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input type="number" placeholder="School No." id="cno" />
                            <button>
                                Connect
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </AuthenticateNetwork>)
}

export default Home;