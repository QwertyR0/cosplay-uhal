import React from 'react';
import "./ErrorInd.css"

function ErrorInd() {
  return (
    <div className="App">
        <div className='errorCard'>
          <h1>Bir Hata ile Karşılaşıldı.</h1>
          <p id="errorMessage"></p>
          <p>Eğer hata devam ederse, lütfen bir görevliye bildirin.</p>
        </div>
    </div>
  )
}

export default ErrorInd;