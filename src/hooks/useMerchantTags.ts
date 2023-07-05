import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, Tag } from '../types/ApiResponses'

export const useMerchantTags = (
  apiUrl: string,
  authToken: string,
  merchantId: string,
  onUnauthorized: () => void,
) => {
  const [tags, setTags] = useState<Tag[]>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchantTags = async () => {
      const client = new MerchantClient(apiUrl, authToken, merchantId, onUnauthorized)
      const response = await client.getTags()

      if (response.data) {
        setTags(response.data)
      } else if (response.error) {
        setApiError(response.error)
      }
    }
    fetchMerchantTags()
  }, [apiUrl, authToken, merchantId, onUnauthorized])

  return {
    tags,
    apiError,
  }
}