import { useEffect, useState } from 'react'
import { ApiError, User } from '../responseTypes'
import { UsersClient } from '../clients'
import { ApiProps } from '../props/props'

export const useUser = ({ url, authToken, onUnauthorized }: ApiProps) => {
  const [user, setUser] = useState<User>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!authToken) {
          return
        }

        setIsLoading(true)

        const client = new UsersClient({ url, authToken, onUnauthorized })
        const response = await client.getUser()

        if (response.status === 'success') {
          setUser(response.data)
        } else {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchUser()
  }, [authToken, onUnauthorized, url])

  return { user, isLoading, apiError }
}
