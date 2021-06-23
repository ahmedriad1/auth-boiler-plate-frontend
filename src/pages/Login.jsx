import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Button from '../components/auth/Button';
import Input from '../components/auth/Input';
import { emailPattern } from '../helpers/auth';
import { useAlertContext } from '../contexts/AlertContext';
import useAuthStore from '../stores/useAuthStore';

const Login = () => {
  const setLogin = useAuthStore(state => state.login);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { showSuccess, showError } = useAlertContext();
  const onSubmit = async data => {
    setLoading(true);
    try {
      const { user, token } = await login(data);
      setLoading(false);
      showSuccess('Logged in successfully !');
      setLogin(user, token);
    } catch (err) {
      showError(err.response.data.message);
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
            Sign in to your account
          </h2>
          <p class='mt-2 text-center text-sm leading-5 text-gray-600'>
            Or
            <Link
              to='/register'
              class='ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
            >
              Need an account ?
            </Link>
          </p>
        </div>
        <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
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
                inputRef={register({ required: true })}
                error={errors.password?.type === 'required' && 'Password is required !'}
              />
            </div>
          </div>

          <div className='mt-6'>
            <Button loading={loading}>Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
