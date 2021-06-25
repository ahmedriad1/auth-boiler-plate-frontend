import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = ({ onSubmit, children, schema, defaultValues, ...props }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {},
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
