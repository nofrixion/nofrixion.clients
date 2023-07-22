import { MerchantClient } from '../clients'
import { ApiProps } from '../types/props'
import { ApiError, Merchant } from '../types/ApiResponses'
import { useEffect, useState } from 'react'

export const useMerchants = ({ apiUrl, authToken }: ApiProps) => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        setIsLoading(true)

        const client = new MerchantClient({ apiUrl, authToken })

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
  }, [apiUrl, authToken])

  return { merchants, isLoading, apiError }
}
