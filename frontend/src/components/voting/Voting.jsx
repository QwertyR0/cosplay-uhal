import { socket } from "../../App";
import "./Voting.css"
import React, { useState, useEffect } from 'react';

function Voting(args) {
    const [status, setStatus, id, vote] = args.props;
    const [voteValue, setVoteValue] = useState(5);

    return (
      <div className="votingC">
        <div className="vcard">
          <h2>{id}</h2>
          <div className="rateButtons">
            <div className={`vButton red ${(status.didVote === true) ? "hide" : ""}`} style={{
              marginRight: "2vh"
            }} onClick={() => {
              if(voteValue > 1)
              setVoteValue(voteValue - 1);
            }}>-</div>
            <h3 id={`voteVal-${id}`} style={{
              position: "relative",
              bottom: "3vh"
            }}>{(vote !== undefined) ? vote : voteValue}/10</h3>
            <div className={`vButton green ${(status.didVote === true) ? "hide" : ""}`} style={{
              marginLeft: "2vh"
            }} onClick={() => {
              if(voteValue < 10)
              setVoteValue(voteValue + 1);
            }}>+</div>
          </div>
        </div>
      </div>
    )
}

export default Voting;