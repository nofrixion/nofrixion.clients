import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, BankSettings } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

export const useBanks = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken, onUnauthorized }: ApiProps,
) => {
  const [banks, setBanks] = useState<BankSettings[]>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanks = async () => {
      if (!authToken || !merchantId) {
        return
      }

      setIsLoading(true)

      const client = new MerchantClient({ apiUrl, authToken, onUnauthorized })
      const response = await client.getBankSettings({ merchantId })

      if (response.status === 'success') {
        setBanks(response.data.payByBankSettings)
      } else {
        setApiError(response.error)
      }

      setIsLoading(false)
    }

    fetchBanks()
  }, [authToken, merchantId, onUnauthorized, apiUrl])

  return {
    banks,
    apiError,
    isLoading,
  }
}
