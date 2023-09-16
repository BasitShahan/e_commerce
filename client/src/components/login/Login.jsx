



import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/Slice';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
     
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
     
    console.log('clicked');
    dispatch(loginUser(values));
    navigate('/')
  };

  return (
    <div className='parentdiv'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form className='formdiv'>
            <div
              style={{
                position: 'relative',
                left: '40%',
                top: '5px',
                color: 'white',
              }}
            >
              <h1 style={{ fontWeight: '500', fontSize: '38px' }}>Login</h1>
            </div>

            <div className='form-group'>
              <label style={{ color: 'white' }} htmlFor='email'>
                Enter your email:
              </label>
              <Field type='email' name='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='div' style={{ color: 'red' }} />
            </div>

            <div className='form-group'>
              <label style={{ color: 'white' }} htmlFor='password'>
                Enter your password:
              </label>
              <Field type='password' name='password' placeholder='Enter password' />
              <ErrorMessage name='password' component='div' style={{ color: 'red' }} />
            </div>

            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-outline-primary'
                style={{ margin: '8px 5px' }}
              >
                Submit
              </button>
              <span style={{ color: 'white' }}>
                if you forget password, click on <NavLink to='/forgetpassword'>Forget</NavLink>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

