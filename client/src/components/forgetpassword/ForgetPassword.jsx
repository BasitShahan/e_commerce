import {useState} from 'react'
import axios from 'axios'

export default function ForgetPassword() {
  const [state, setState] = useState({ email: '' });

  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const send = async (e) => {
    e.preventDefault();
     try {
      const response = await axios.post('/forget-password', state);
      if(response){
          alert('Email has been successfully sent to your gmail account')
      }
      
     } catch (error) {
      console.log(error)
     }
      
     
    
  };

  return (
    <div>
  
  <form  >
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input  name='email' onChange={change} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

  </div>
  

  <button type="submit" onClick={send} className="btn btn-primary">Submit</button>

</form>
</div>
  );
}
