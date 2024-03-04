import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import ErrorInd from './components/errorInd/ErrorInd';
import { useEffect, useState } from 'react';
import VoteMenu from './components/voteMenu/VoteMenu';
export var socket = new WebSocket("wss://sunucu.uhal.online/");
var retry = 0;
var beenTrying = false;

socket.onopen = () => {
  console.log("Connected to server");
  retry = 0;
}

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(0);
  const [timer, setTimer] = useState(0);
  const [person, setPerson] = useState({token: ""});
  const [status, setStatus] = useState({
    ids: [],
    didVote: false
  });
  const [didStart, setDidStart] = useState(false);

  const retryConnection = () => {
    if(retry < 5) {
      retry++;
      socket = new WebSocket("wss://sunucu.uhal.online/");
    } else {
      console.log("Failed to connect to server");
      document.getElementById("errorMessage").innerText = "Sunucuya bağlanılamadı.";
      setLoggedIn(3);
    }
  }

  const sendVotes = () => {
    let voteData = {
      type: "vote",
      value: []
    }

    status.ids.forEach((id, index) => {
      voteData.value.push({
        id: id,
        value: parseInt(document.getElementById(`voteVal-${id}`).innerText.replace("/10", ""))
      });
    });

    socket.send(JSON.stringify(voteData));
    return voteData.value;
  }

  socket.onmessage = (e) => {
    // plain text here
    if(e.data === 'ping') {
      console.log("Pinged");
      socket.send(JSON.stringify({
        type: "alive"
      }));
      return;
    } else if(e.data === 'no') {
        const text = document.getElementById("alertText");
        const but = document.getElementById("loginButton");
        text.innerText = "Bilet kodunuz hatalı."
        text.style.display = "block";
        but.innerText = "Giriş";
        but.disabled = false;
        but.style.backgroundColor = "#4CAF50";

        setLoggedIn(0);
        return;
    } else if(e.data === "alreadyJoined"){
        const text = document.getElementById("alertText");
        const but = document.getElementById("loginButton");
        text.innerText = "Bu kod ile zaten giriş yapılmış."
        text.style.display = "block";
        but.innerText = "Giriş";
        but.disabled = false;
        but.style.backgroundColor = "#4CAF50";

        setLoggedIn(0);
        return;
    } else if(e.data === "didnotstart") {
      setDidStart(false);
      return;
    }

    // json here
    let parsedData = JSON.parse(e.data);
    if(parsedData.type === "success") {
      const but = document.getElementById("loginButton");
      but.innerText = "Giriş";
      but.disabled = false;
      but.style.backgroundColor = "#4CAF50";

      setStatus({
        ids: parsedData.list,
        didVote: parsedData.didVote,
        votedIds: parsedData.votedIds
      });

      console.log(status);
      
      setLoggedIn(2);
      return;
    } else if(parsedData.type === "started") {
      console.log("started", parsedData);

      setDidStart(true);
      setStatus({
        ids: parsedData.ids,
        didVote: parsedData.didVote,
        votedIds: parsedData.votedIds
      });
      setTimer(parsedData.time);
      return;
    } else if(parsedData.type === "newTime") {
      setTimer(parsedData.time);
      return;
    }
  }

  socket.onerror = (e) => {
    console.log("Failed to connect to server");
    setLoggedIn(3);
    setTimeout(() => {
      document.getElementById("errorMessage").innerText = "Sunucuya bağlanılamadı.";
    }, 1000);
  }

  socket.onclose = () => {
    console.log("Disconnected from server");
    console.log("Failed to connect to server");
    setLoggedIn(3);
    setTimeout(() => {
      document.getElementById("errorMessage").innerText = "Sunucuya bağlanılamadı.";
    }, 1000); 
  }

  useEffect(() => {
    if (loggedIn === 1 || loggedIn === 0) {
      navigate('/login');
    } else if(loggedIn === 2) {
      navigate('/');

      setTimeout(() => {
        socket.send(JSON.stringify({type: "didStart"}));
      }, 250);
    } else if(loggedIn === 3) {
      navigate('/error');
    }

    window.addEventListener('beforeunload', () => {
      socket.close();
    });

    const interval = setInterval(() => {
      console.log(socket.readyState);
      if(socket.readyState === 3 || socket.readyState === 2) {
        // setLoggedIn(0);
        setLoggedIn(3);
      }
      if(beenTrying === false && socket.readyState === 0) {
        beenTrying = true;
      } else if(beenTrying === true && socket.readyState === 0) {
        setLoggedIn(3);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [loggedIn, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(timer > 0) {
        setTimer(timer - 1);
      } else if(status.didVote === false){
        const votes = sendVotes();
        setStatus({
          ids: status.ids,
          didVote: true,
          votedIds: votes
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className='bg'>
      <Navbar />
          <Routes>
              <Route path="/" element={
                <VoteMenu props={[status, setStatus, didStart, timer, sendVotes]}/>
                // <Results props={[status, setStatus]}/>
              } />
              <Route path="/login" element={
                <div className="App">
                  <Login props={[setLoggedIn, setPerson, person]}/>
                </div>
              } />
              <Route path="/error" element={
                <ErrorInd />
              } />
              <Route path="/results" element={
                <div>
                  <h1>Sonuçlar</h1>
                  <p>Yarışmanın sonuçları burada olacak.</p>
                </div>
              } />
              <Route path="*" element={
                <div className="App">
                <div>
                  <h1>404</h1>
                  <p>Sayfa bulunamadı.</p>
                </div>
                </div>
              } />
          </Routes>
    </div>
  );
}

export default App;