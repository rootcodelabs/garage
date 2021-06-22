import { getAuthCredsByType } from './';

interface AxiosConfig {
  headers: {
    Authorization: string;
  };
}
export async function axiosConfig(
  tokenType: 'customerAccessToken' | 'ownerAccessToken' | 'expertAccessToken',
): Promise<AxiosConfig> {
  const token = await getAuthCredsByType(tokenType);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
