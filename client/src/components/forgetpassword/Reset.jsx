import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Reset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({ password: '', cpassword: '' });
   const [visible, setVisible] = useState(false);
  const change = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const send = async (e) => {
    e.preventDefault();
    const { password, cpassword } = state;

    try {
      if (password !== cpassword) {
        alert('Password not matched');
        return; // Don't proceed further if passwords don't match
      }

      const response = await axios.post(`/update/${id}`, state);
      if (response.data) {
    
      setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>    
     
    <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            New Password
          </label>
          <input
            style={{ width: '400px' }}
            name="password"
            onChange={change}
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={change}
            type="password"
            name="cpassword"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={send} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    
    </>

  );
}
