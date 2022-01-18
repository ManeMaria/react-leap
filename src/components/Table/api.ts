import { AxiosResponse } from 'axios';

import axios from '@/lib/axios';

export const getPaginatedData = async ({
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
}): Promise<any> => {
  try {
    const offset = (page - 1) * pageSize;
    const response: AxiosResponse = await axios.authorized({ mock: mockServer }).get(endpoint, {
      params: {
        [nameSearch]: query,
        [nameLimit]: pageSize,
        [nameOffset]: offset,
        [nameOrder]: `${order?.column}:${order?.ord}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Error fetching the data');
  }
};

export const getCount = async ({ endpoint, mockServer }): Promise<number> => {
  try {
    const countUrl = `${endpoint}/count`;
    const response: AxiosResponse = await axios.authorized({ mock: mockServer }).get(countUrl);

    return response.data;
  } catch (err) {
    throw new Error('Error during count');
  }
};
