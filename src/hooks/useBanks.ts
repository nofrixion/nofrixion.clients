import { MerchantClient } from '../clients/MerchantClient'
import { formatApiResponse } from '../types'
import { ApiResponse, MerchantBankSettings } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchBanks = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<MerchantBankSettings>> => {
  if (!merchantId) {
    return formatApiResponse<MerchantBankSettings>('No merchantId provided')
  }

  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getBankSettings({ merchantId })

  return response
}

export const useBanks = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['Banks', merchantId]

  return useQuery<ApiResponse<MerchantBankSettings>, Error>(
    QUERY_KEY,
    () => fetchBanks(apiUrl, merchantId, authToken),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )
}
