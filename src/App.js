import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import WaitingRoom from './routes/WaitingRoom';
import { AnimatePresence } from 'framer-motion';
import Room from './routes/Room';
import socket from './SocketConnection';

function App() {

  const location = useLocation();

  socket.on('connect', () => {
    console.log(`%c Connected to server with id: ` + `%c${socket.id} `, 'background: #444; color: #bada55; padding: 2px; border-radius:20px 0px 0px 20px; font-size: 1rem;', 'background: #444; color: red; padding: 2px; border-radius:0px 20px 20px 0px; font-size: 1rem;');
  });

  return (<>
    <AnimatePresence mode='wait'>
      <Routes key={location.key + location.pathname} location={location}>

        <Route path="/"             element={<Home        />} />
        <Route path="/waiting-room" element={<WaitingRoom />} />
        <Route path="/room"         element={<Room        />} />

      </Routes>
    </AnimatePresence>
  </>);
}

export default App;