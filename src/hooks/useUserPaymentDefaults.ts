import { useEffect, useState } from 'react'
import { ApiError, UserPaymentDefaults } from '../responseTypes/ApiResponses'
import { ClientSettingsClient } from '../clients/ClientSettingsClient'
import { ApiProps } from '../props/props'

export const useUserPaymentDefaults = ({ url, authToken, onUnauthorized }: ApiProps) => {
  const [userPaymentDefaults, setUserPaymentDefaults] = useState<UserPaymentDefaults>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isUserPaymentDefaultsLoading, setisUserPaymentDefaultsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserPaymentDefaults = async () => {
      setisUserPaymentDefaultsLoading(true)
      const client = new ClientSettingsClient({ url, authToken, onUnauthorized })
      const response = await client.getUserPaymentDefaults()

      if (response.data) {
        setUserPaymentDefaults(response.data)
      } else if (response.error) {
        setApiError(response.error)
      }
      setisUserPaymentDefaultsLoading(false)
    }

    fetchUserPaymentDefaults()
  }, [authToken, onUnauthorized, url])

  return {
    userPaymentDefaults,
    apiError,
    isUserPaymentDefaultsLoading,
  }
}
