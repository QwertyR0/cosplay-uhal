import React from 'react';
import "./Approval.css";

function Approval(args) {
  const [status, setStatus, approvalModal, setApprovalModal, sendVotes] = args.props;

  return (
    <div className="appprovalModal">
      <div className='apTextS'>
        <h2>Emin Misiniz?</h2>
        <h4 style={{fontSize:"larger"}}>Eğer onaylarsanız oylarınız gönderildikten sonra değiştirilemez.</h4>
        <div className='apButtons'>
          <div className='apButton red' onClick={() => {
            setApprovalModal(false);
          }}>Geri Dön</div>
          <div className='apButton green' onClick={() => {
            setApprovalModal(false);
            const votes = sendVotes();
            setStatus({
              ids: status.ids,
              didVote: true,
              votedIds: votes
            })
          }}>Onayla</div>
        </div>
      </div>
    </div>
  )
}

export default Approval;