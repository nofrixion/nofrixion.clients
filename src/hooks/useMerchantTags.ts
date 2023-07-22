import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, Tag } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

export const useMerchantTags = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const [tags, setTags] = useState<Tag[]>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchantTags = async () => {
      const client = new MerchantClient({ apiUrl, authToken })
      const response = await client.getTags({ merchantId })

      if (response.status === 'success') {
        setTags(response.data)
      } else {
        setApiError(response.error)
      }
    }
    fetchMerchantTags()
  }, [authToken, merchantId, apiUrl])

  return {
    tags,
    apiError,
  }
}
