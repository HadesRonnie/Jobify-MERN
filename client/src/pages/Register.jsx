import {
  Form,
  redirect,
  useNavigation,
  Link,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.post('/auth/register', data);
    // toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  // const navigate = useNavigate();
  // const actionData = useActionData();
  // console.log('actionData: ', actionData);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // useEffect(() => {
  //   if (actionData?.status === 201) {
  //     toast.success(actionData?.msg);
  //   } else {
  //     toast.error(actionData?.msg);
  //   }
  // }, [actionData, navigate]);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Aditya" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Mehta"
        />
        <FormRow type="text" name="location" defaultValue="New Delhi" />
        <FormRow
          type="email"
          name="email"
          defaultValue="adityamehta263@gmail.com"
        />
        <FormRow type="password" name="password" defaultValue="aditya123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
      toast.success
    </Wrapper>
  );
};
export default Register;
