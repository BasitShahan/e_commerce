import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { createuser } from '../../redux/Slice';
import './signup.css'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate();
   const dispatch=useDispatch();
    const validationSchema = Yup.object().shape({
    name: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {

         dispatch(createuser(values))
          navigate('/')
    // Formik values object containing form data
  };

  return (
    <div className='arentdiv'>
      <Formik
        initialValues={{ name: '',email:'', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form className='ormdiv' onSubmit={handleSubmit}>
            <div style={{ position: 'relative', left: '27%', top: '5px', color: 'white' }}>
              <h1 style={{ fontWeight: '500', fontSize: '38px' }}>Registration</h1>
            </div>

            
            <div className='form-group'>
              <label htmlFor='name' style={{color:'white'}}>Enter your name:</label>
              <Field type='text' name='name' placeholder='Enter your name' />
              <ErrorMessage name='name' component='div' style={{color:'red'}} />
            </div>
            
            
            <div className='form-group'>
              <label htmlFor='name'  style={{color:'white'}}>Enter your email:</label>
              <Field type='text' name='email' placeholder='Enter your email' />
              <ErrorMessage name='name' component='div' style={{color:'red'}} />
            </div>


            <div className='form-group'>
              <label htmlFor='password'  style={{color:'white'}}>Enter your password:</label>
              <Field type='password' name='password' placeholder='Enter password' />
              <ErrorMessage name='password' component='div' style={{color:'red'}} />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-outline-primary' >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
