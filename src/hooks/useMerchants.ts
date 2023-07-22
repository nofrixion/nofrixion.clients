import { MerchantClient } from '../clients/MerchantClient'
import { ApiResponse, Merchant } from '../types/ApiResponses'
import { ApiProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchMerchants = async (
  apiUrl: string,
  authToken?: string,
): Promise<ApiResponse<Merchant[]>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.get()

  return response
}

export const useMerchants = ({ apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['Merchants']

  return useQuery<ApiResponse<Merchant[]>, Error>(
    QUERY_KEY,
    () => fetchMerchants(apiUrl, authToken),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )
}
