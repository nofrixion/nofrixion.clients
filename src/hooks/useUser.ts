import { useEffect, useState } from 'react'
import { ApiError, User } from '../responseTypes'
import { UsersClient } from '../clients'

export const useUser = (apiUrl: string, onUnauthorized: () => void, accessToken?: string) => {
  const [user, setUser] = useState<User>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!accessToken) {
          return
        }

        setIsLoading(true)

        const client = new UsersClient(apiUrl, accessToken, onUnauthorized)
        const response = await client.getUser()

        if (response.data) {
          setUser(response.data)
        } else if (response.error) {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchUser()
  }, [accessToken, apiUrl, onUnauthorized])

  return { user, isLoading, apiError }
}
