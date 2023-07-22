import { useEffect, useState } from 'react'
import { ApiError, User } from '../types'
import { UsersClient } from '../clients'
import { ApiProps } from '../types/props'

export const useUser = ({ apiUrl, authToken }: ApiProps) => {
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

        const client = new UsersClient({ apiUrl, authToken })
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
  }, [authToken, apiUrl])

  return { user, isLoading, apiError }
}
