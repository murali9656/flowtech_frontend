import React from 'react';
import './resetpassword.css';

export default function resetpassword() {
    
  return (
    <section>
    <div>
     <div id="resetpassword_div">

     <h5 id="resetpassword_h4">Password Reset</h5>
     <span id="resetpassword_span">Please provide the valid email address you used to register</span><br/>
     <input type='email' id="resetpassword_input" name='email' placeholder='Enter Your Working Email...' />
     <button id="resetpassword_button">&#128231;&nbsp;Send</button><hr id="resetpassword_hr"/>
     <span id="resetpassword_span2">A link will be sent to your email containing the information you need for your password</span>

     </div>
    </div>
    </section>
  )
}
