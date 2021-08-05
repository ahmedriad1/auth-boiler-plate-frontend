import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register as signup } from '../api/auth';
import Button from '../components/auth/Button';
import useAuthStore from '../stores/useAuthStore';
import toast from '../helpers/toast';
import Form from '../components/Form';
import FormInput from '../components/Form/FormInput';
import * as yup from 'yup';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup
      .string()
      .min(8)
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  });
  const login = useAuthStore(state => state.login);

  const onSubmit = async data => {
    setLoading(true);
    try {
      const { user, token } = await signup(data);
      setLoading(false);
      toast('success', 'Account created successfully !');
      login(user, token);
    } catch (err) {
      toast('error', err?.response?.data?.message);
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
        <Form className='mt-8' onSubmit={onSubmit} schema={schema}>
          <div>
            <div>
              <FormInput name='name' type='text' placeholder='Name' />
            </div>
            <div className='mt-3'>
              <FormInput name='email' type='email' placeholder='Email address' />
            </div>
            <div className='mt-3'>
              <FormInput name='password' type='password' placeholder='Password' />
            </div>

            <div className='mt-3'>
              <FormInput
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
              />
            </div>
          </div>

          <div className='mt-6'>
            <Button loading={loading}>Register</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
