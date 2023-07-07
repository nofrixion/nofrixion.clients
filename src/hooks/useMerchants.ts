import { MerchantClient } from '../clients'
import { ApiError, Merchant } from '../responseTypes/ApiResponses'
import { useEffect, useState } from 'react'

export const useMerchants = (apiUrl: string, onUnauthorized: () => void, accessToken?: string) => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        if (!accessToken) {
          return
        }

        setIsLoading(true)

        const client = new MerchantClient(apiUrl, accessToken, onUnauthorized)

        const response = await client.get()

        if (response.data) {
          setMerchants(response.data)
        } else if (response.error) {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchMerchants()
  }, [accessToken, apiUrl, merchants, onUnauthorized])

  return { merchants, isLoading, apiError }
}
