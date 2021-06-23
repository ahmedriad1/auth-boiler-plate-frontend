import { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/auth/Input';
import { useForm } from 'react-hook-form';
import { emailPattern, setToken } from '../helpers/auth';
import { update, updatePassword as updatePass } from '../api/auth';
import { useAlertContext } from '../contexts/AlertContext';
import useAuthStore from '../stores/useAuthStore';

const Profile = () => {
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { showError, showSuccess } = useAlertContext();

  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);

  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    errors: passwordErrors,
    watch,
  } = useForm();

  const updateDetails = async data => {
    try {
      setDetailsLoading(true);
      const { user } = await update(data);
      showSuccess('Updated successfully !');
      setDetailsLoading(false);
      updateUser(user);
    } catch (err) {
      setDetailsLoading(false);
      showError(err.response.data.message);
    }
  };

  const updatePassword = async data => {
    try {
      setPasswordLoading(true);
      const { token } = await updatePass(data);
      showSuccess('Password updated successfully !');
      setPasswordLoading(false);
      setToken(token);
    } catch (err) {
      setPasswordLoading(false);
      showError(err.response.data.message);
    }
  };

  return (
    <Layout title='Profile'>
      <div>
        <h1 className='text-3xl font-semibold'>Details</h1>
        <form className='mt-4' onSubmit={handleSubmit(updateDetails)}>
          <div className='sm:flex space-y-6 sm:space-x-8 sm:space-y-0'>
            <div className='sm:w-1/2'>
              <label htmlFor='name' className='block text-sm mb-2'>
                Name
              </label>
              <Input
                inputRef={register({ required: true })}
                name='name'
                id='name'
                type='text'
                error={errors.name?.type === 'required' && 'Name is required !'}
              />
            </div>
            <div className='sm:w-1/2'>
              <label htmlFor='email' className='block text-sm mb-2'>
                Email
              </label>
              <Input
                inputRef={register({ required: true, pattern: emailPattern() })}
                name='email'
                id='email'
                type='text'
                error={
                  (errors.email?.type === 'required' && 'Email address is required !') ||
                  (errors.email?.type === 'pattern' && 'Invalid email address !')
                }
              />
            </div>
          </div>
          <button
            className='px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600
            text-white mt-6 focus:outline-none focus:bg-indigo-600 flex justify-center
            items-center'
            type='submit'
          >
            {detailsLoading ? (
              <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Update Details'
            )}
          </button>
        </form>
      </div>
      <div className='mt-8'>
        <h1 className='text-3xl font-semibold'>Password</h1>
        <form className='mt-4 space-y-6' onSubmit={handlePasswordSubmit(updatePassword)}>
          <div>
            <label htmlFor='current_password' className='block text-sm mb-2'>
              Current Password
            </label>
            <Input
              inputRef={registerPassword({ required: true })}
              name='current_password'
              id='current_password'
              type='password'
              error={
                passwordErrors.current_password?.type === 'required' &&
                'Current Password is required !'
              }
            />
          </div>
          <div className='sm:flex space-y-6 sm:space-x-8 sm:space-y-0'>
            <div className='sm:w-1/2'>
              <label htmlFor='password' className='block text-sm mb-2'>
                Password
              </label>
              <Input
                inputRef={registerPassword({ required: true, minLength: 8 })}
                name='password'
                id='password'
                type='password'
                error={
                  (passwordErrors.password?.type === 'required' &&
                    'Password is required !') ||
                  (passwordErrors.password?.type === 'minLength' &&
                    'Password must be at least 8 characters !')
                }
              />
            </div>
            <div className='sm:w-1/2'>
              <label htmlFor='confirm_password' className='block text-sm mb-2'>
                Confirm Password
              </label>
              <Input
                inputRef={registerPassword({
                  required: true,
                  validate: value => {
                    return (
                      value === watch('password') || 'Confirm password does not match !'
                    );
                  },
                })}
                name='confirm_password'
                id='confirm_password'
                type='password'
                error={
                  (passwordErrors.confirm_password?.type === 'required' &&
                    'Password is required !') ||
                  (passwordErrors.confirm_password &&
                    passwordErrors.confirm_password.message)
                }
              />
            </div>
          </div>
          <button
            className='px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600
            text-white mt-6 focus:outline-none focus:bg-indigo-600 flex justify-center
            items-center'
            type='submit'
          >
            {passwordLoading ? (
              <div className='lds-ring'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
