import { MerchantClient } from '../clients'
import { ApiProps } from '../types/props'
import { ApiError, Merchant } from '../types/ApiResponses'
import { useEffect, useState } from 'react'

export const useMerchants = ({ apiUrl, authToken, onUnauthorized }: ApiProps) => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        if (!authToken) {
          return
        }

        setIsLoading(true)

        const client = new MerchantClient({ apiUrl, authToken, onUnauthorized })

        const response = await client.get()

        if (response.status === 'success') {
          setMerchants(response.data)
        } else {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchMerchants()
  }, [apiUrl, authToken, onUnauthorized])

  return { merchants, isLoading, apiError }
}
