import { AccountsClient } from '../clients'
import { Account, ApiResponse, formatApiResponse } from '../types'
import { ApiProps, MerchantProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchAccounts = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<Account[]>> => {
  if (!merchantId) {
    return formatApiResponse<Account[]>('No merchantId provided. Cannot fetch accounts.')
  }
  const client = new AccountsClient({ apiUrl, authToken })
  const response = await client.getAccounts({ merchantId: merchantId })

  return response
}

export const useAccounts = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['Accounts', merchantId]

  return useQuery<ApiResponse<Account[]>, Error>(
    QUERY_KEY,
    () => fetchAccounts(apiUrl, merchantId, authToken),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )
}
