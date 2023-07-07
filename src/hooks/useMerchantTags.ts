import { useEffect, useState } from 'react'
import { MerchantClient } from '../clients/MerchantClient'
import { ApiError, Tag } from '../responseTypes/ApiResponses'
import { ApiProps, useMerchantTagsProps } from '../props/props'

export const useMerchantTags = (
  { merchantId }: useMerchantTagsProps,
  { url, authToken, onUnauthorized }: ApiProps,
) => {
  const [tags, setTags] = useState<Tag[]>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchMerchantTags = async () => {
      const client = new MerchantClient({ url, authToken, onUnauthorized })
      const response = await client.getTags({ merchantId })

      if (response.data) {
        setTags(response.data)
      } else if (response.error) {
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
