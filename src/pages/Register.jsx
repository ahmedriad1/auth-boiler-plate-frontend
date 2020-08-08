import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../store/actionTypes';
import { useForm } from 'react-hook-form';
import { register } from '../api/auth';
import Button from '../components/auth/Button';
import Input from '../components/auth/Input';
import { emailPattern, setToken } from '../helpers/auth';

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    try {
      const { user, token } = await register(data);
      setToken(token);
      setLoading(false);
      dispatch({ type: actionTypes.SET_LOGIN, payload: { user } });
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div>
          <Link to='/'>
            <img className='mx-auto h-12 w-auto' src='/logo-white.svg' alt='Workflow' />
          </Link>
          <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
            Create an account
          </h2>
          <p class='mt-2 text-center text-sm leading-5 text-gray-600'>
            Or
            <Link
              to='/login'
              class='ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
            >
              Already have an account ?
            </Link>
          </p>
        </div>
        <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Input
                aria-label='Name'
                name='name'
                type='text'
                placeholder='Name'
                inputRef={register({ required: true })}
                error={errors.name?.type === 'required' && 'Name is required !'}
              />
            </div>
            <div className='mt-3'>
              <Input
                aria-label='Email address'
                name='email'
                type='email'
                placeholder='Email address'
                inputRef={register({ required: true, pattern: emailPattern() })}
                error={
                  (errors.email?.type === 'required' && 'Email address is required !') ||
                  (errors.email?.type === 'pattern' && 'Invalid email address !')
                }
              />
            </div>
            <div className='mt-3'>
              <Input
                aria-label='Password'
                name='password'
                type='password'
                placeholder='Password'
                inputRef={register({ required: true, minLength: 8 })}
                error={
                  (errors.password?.type === 'required' && 'Password is required !') ||
                  (errors.password?.type === 'minLength' &&
                    'Password must be at least 8 characters!')
                }
              />
            </div>

            <div className='mt-3'>
              <Input
                aria-label='Confirm Password'
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
                inputRef={register({
                  required: true,
                  validate: value => {
                    return (
                      value === watch('password') || 'Confirm password does not match !'
                    );
                  },
                })}
                error={
                  (errors.confirm_password?.type === 'required' &&
                    'Confirm password is required !') ||
                  (errors.confirm_password && errors.confirm_password.message)
                }
              />
            </div>
          </div>

          <div className='mt-6'>
            <Button loading={loading}>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
