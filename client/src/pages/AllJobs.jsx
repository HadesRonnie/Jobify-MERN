import { useLoaderData } from 'react-router-dom';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { createContext, useContext } from 'react';
const AllJobsContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    // console.log('loader', data);

    return { data };
  } catch (error) {
    return error;
  }
};
const AllJobs = () => {
  const { data } = useLoaderData();
  // console.log('alljobs', data);

  return (
    <AllJobsContext.Provider value={{ data }}>
      {/* <SearchContainer /> */}
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
