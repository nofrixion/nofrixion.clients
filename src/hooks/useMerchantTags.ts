import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, Tag } from '../responseTypes/ApiResponses'

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
      const client = new MerchantClient(apiUrl, authToken, onUnauthorized)
      const response = await client.getTags(merchantId)

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
