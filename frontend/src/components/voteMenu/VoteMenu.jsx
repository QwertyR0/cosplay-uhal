import "./VoteMenu.css"
import React, { useState, useEffect } from 'react';
import Approval from "../approval/Approval";
import Voting from "../voting/Voting";
let dont = false;

function addLeadingZeros(num, targetLength) {

  let numStr = num.toString();

  while (numStr.length < targetLength) {

    numStr = '0' + numStr;

  }

  return numStr;
}

function VoteMenu(args) {
    const [status, setStatus, didStart, timeLeft, sendVotes] = args.props;
    const [approvalModal, setApprovalModal] = useState(false);

    useEffect(() => {
      if(approvalModal) {
        document.body.classList.add('active-ApprovalModal')
      } else {
        document.body.classList.remove('active-ApprovalModal')
      }
    }, [approvalModal]);

    return (
      <div> 
        {didStart === true ? 
          <div className="vcontainer">
          <div className="bgcard">
            <div className="infoContainer">
            <h2>{!status.didVote ? "Yarışmacıları Oylayınız." : "Yarışmacıları Oyladınız."}</h2>
            <h5>{!status.didVote ? "Şimdi cosplayerları oylayabilirsiniz. Doğru bir sonuç alınabilmesi için lütfen bütün yarışmacıları oylamaya çalışın." : "Şimdi arkanıza yaslanın ve sonuçların açıklanmasını bekleyin 😎."}</h5>
            {status.didVote ? <img src="https://media1.tenor.com/m/mq-MxHFT0s0AAAAC/hopping-jumping.gif" width="120wh"></img> : null}
            <h3 id="timer">{
              timeLeft > 0 ? `${addLeadingZeros(Math.floor(timeLeft/60), 2)}:${addLeadingZeros(timeLeft%60, 2)}` : "Süre Doldu."
            }</h3>
            </div>
            <div className="gridContainer">
            {
            status.ids.map((id, e) => {
              if(status.votedIds.find(a => a.participant === id) && status.didVote) {
              const vote = status.votedIds[e];
                return (
                  <div className={"mVote gridItem"}>
                  <Voting id={id} key={id} props={[status, setStatus, id, vote.value]} />
                  </div>
                )
              } else {
                return (
                  <div className={"mVote gridItem"}>
                  <Voting id={id} key={id} props={[status, setStatus, id]} />
                  </div>
                )
              }
            })
            }
            </div>
            {!status.didVote ? 
            <div className="sendButton" onClick={() => {
              setApprovalModal(!approvalModal);
            }}>Oyları Gönder</div>
            : null}
          </div>
          </div>
          : 
        <div className="vcontainer centered">
        <div className="bgcard">
          <div className="infoContainer centered">
          <h2>Oylama Henüz Başlamadı.</h2>
          <h5>Oylama başlamadığı için oy veremezsiniz (cidden 😮).</h5>
          </div>
        </div>
        </div>
      }
      {approvalModal ? <Approval props={[status, setStatus, approvalModal, setApprovalModal, sendVotes]}/> : null}
      </div>
    )
}

export default VoteMenu;