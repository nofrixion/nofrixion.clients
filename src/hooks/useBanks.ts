import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, BankSettings } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

export const useBanks = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const [banks, setBanks] = useState<BankSettings[]>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanks = async () => {
      if (!merchantId) {
        return
      }

      setIsLoading(true)

      const client = new MerchantClient({ apiUrl, authToken })
      const response = await client.getBankSettings({ merchantId })

      if (response.status === 'success') {
        setBanks(response.data.payByBankSettings)
      } else {
        setApiError(response.error)
      }

      setIsLoading(false)
    }

    fetchBanks()
  }, [authToken, merchantId, apiUrl])

  return {
    banks,
    apiError,
    isLoading,
  }
}
