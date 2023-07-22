import { useEffect, useState } from 'react'
import { ApiError, UserPaymentDefaults } from '../types/ApiResponses'
import { ClientSettingsClient } from '../clients/ClientSettingsClient'
import { ApiProps } from '../types/props'

export const useUserPaymentDefaults = ({ apiUrl, authToken }: ApiProps) => {
  const [userPaymentDefaults, setUserPaymentDefaults] = useState<UserPaymentDefaults>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isUserPaymentDefaultsLoading, setisUserPaymentDefaultsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserPaymentDefaults = async () => {
      setisUserPaymentDefaultsLoading(true)
      const client = new ClientSettingsClient({ apiUrl, authToken })
      const response = await client.getUserPaymentDefaults()

      if (response.status === 'success') {
        setUserPaymentDefaults(response.data)
      } else {
        setApiError(response.error)
      }
      setisUserPaymentDefaultsLoading(false)
    }

    fetchUserPaymentDefaults()
  }, [authToken, apiUrl])

  return {
    userPaymentDefaults,
    apiError,
    isUserPaymentDefaultsLoading,
  }
}
