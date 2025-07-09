import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs/stats');
    console.log(data);

    return data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
