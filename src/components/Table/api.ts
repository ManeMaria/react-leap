import axios from '@/lib/axios';
export async function getPaginatedData({
  page,
  pageSize,
  endpoint,
  nameSearch,
  query,
  nameLimit,
  nameOffset,
  nameOrder,
  mockServer,
  order,
}) {
  try {
    const offset = (page - 1) * pageSize;
    const endpointWithParams = `${endpoint}?${nameSearch}=${query}&${nameLimit}=${pageSize}&${nameOffset}=${offset}&${nameOrder}=${order?.column}:${order?.ord}`;
    const response: any = await axios.authorized({ mock: mockServer }).get(endpointWithParams);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error('Error fetching the data');
  }
}

export async function getCount({ endpoint, mockServer }) {
  try {
    const countUrl = `${endpoint}/count`;
    const response: number = await axios.authorized({ mock: mockServer }).get(countUrl);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error('Error during count');
  }
}
