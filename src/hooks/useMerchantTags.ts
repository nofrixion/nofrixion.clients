import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, Tag } from '../responseTypes/ApiResponses'
import { ApiProps, MerchantProps } from '../props/props'

export const useMerchantTags = (
  { merchantId }: MerchantProps,
  { url, authToken, onUnauthorized }: ApiProps,
) => {
  const [tags, setTags] = useState<Tag[]>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchantTags = async () => {
      const client = new MerchantClient({ url, authToken, onUnauthorized })
      const response = await client.getTags({ merchantId })

      if (response.status === 'success') {
        setTags(response.data)
      } else {
        setApiError(response.error)
      }
    }
    fetchMerchantTags()
  }, [authToken, merchantId, onUnauthorized, url])

  return {
    tags,
    apiError,
  }
}
