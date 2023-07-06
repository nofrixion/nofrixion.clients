'use client'
import { Merchant } from '../responseTypes/ApiResponses'
import { useEffect, useState } from 'react'

export const useMerchants = (apiUrl: string, accessToken?: string, onUnauthorized?: () => void) => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        if (!accessToken) {
          return
        }

        setIsLoading(true)

        const response = await fetch(`${apiUrl}/merchants`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 401) {
          onUnauthorized && onUnauthorized()
          setIsLoading(false)
          return
        }

        const merchants = (await response.json()) as Merchant[]

        setMerchants(merchants)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchMerchants()
  }, [accessToken, apiUrl, onUnauthorized])

  return { merchants, isLoading }
}
