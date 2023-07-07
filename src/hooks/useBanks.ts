import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, BankSettings } from '../responseTypes/ApiResponses'
import { ApiProps, MerchantProps } from '../props/props'

export const useBanks = (
  { merchantId }: MerchantProps,
  { url, authToken, onUnauthorized }: ApiProps,
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

      const client = new MerchantClient({ url, authToken, onUnauthorized })
      const response = await client.getBankSettings({ merchantId })

      if (response.data) {
        setBanks(response.data.payByBankSettings)
      } else if (response.error) {
        setApiError(response.error)
      }

      setIsLoading(false)
    }

    fetchBanks()
  }, [authToken, merchantId, onUnauthorized, url])

  return {
    banks,
    apiError,
    isLoading,
  }
}
