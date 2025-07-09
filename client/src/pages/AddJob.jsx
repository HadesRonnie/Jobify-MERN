import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { useDashboardContext } from './DashboardLayout';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { FormRow, FormRowSelect } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/jobs', data);
    return redirect('all-jobs');
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { user } = useOutletContext();
  // const { user } = useDashboardContext();
  // console.log('dashboard', user);
  // console.log('outlet', user);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
