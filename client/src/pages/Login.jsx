import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    // alert(`Hello ${data.name}`);
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };

    try {
      await customFetch.post('/auth/login', data);
      // alert('hello Test User');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue="adityamehta263@gmail.com"
        />
        <FormRow type="password" name="password" defaultValue="aditya123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
        <button type="button" onClick={loginDemoUser} className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
