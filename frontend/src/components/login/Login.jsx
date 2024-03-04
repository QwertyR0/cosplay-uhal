import "./Login.css"
import React, { useState } from 'react';
import { socket } from '../../App';

function Login(args) {
    const [setLoggedIn, setPerson, person] = args.props

    return (
        <div className="card">
        <h2>Giriş Yap</h2>
        <div className="inputs">
        <div style={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            right: "5%"
        }}>
        <img src="./ticket.svg" style={{filter: "invert(100%)", width: "10%", marginRight: "5px"}}></img>
        <input placeholder="Bilet Kodunuz" onChange={(e) => {setPerson({token: e.target.value.toLowerCase()})}} />
        </div>
        <p id="alertText"></p>
            <button id="loginButton" onClick={
                (e) => {
                    const text = document.getElementById("alertText");
                    if(person.token === '') {
                        text.innerText = "Lütfen Bilet Kodunuz Girin."
                        text.style.display = "block";
                        return;
                    }

                    //FIXME:
                    if(person.token.length !== 12 && false) {
                        text.innerText = "Bu Geçerli bir Bilet Kodu Değil."
                        text.style.display = "block";
                        return
                    }
                    text.style.display = "none";
                    e.target.innerText = "Yükleniyor...";
                    e.target.disabled = true;
                    e.target.style.backgroundColor = "gray";

                    socket.send(JSON.stringify({
                        type: "login",
                        token: person.token
                    }));

                    setLoggedIn(1);
                }
            }>Giriş</button>
            </div>
        </div>
    )
}

export default Login;