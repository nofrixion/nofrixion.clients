import { useEffect, useState } from 'react'
import { NOFRIXION_API_URL } from '../constants'
import { User } from '../types/localTypes'

export const useUser = (accessToken?: string, onUnauthorized?: () => void) => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!accessToken) {
          return
        }

        setIsLoading(true)

        const response = await fetch(`${NOFRIXION_API_URL}/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 401) {
          setIsLoading(false)
          onUnauthorized && onUnauthorized()
          return
        }

        const user = (await response.json()) as User

        setUser(user)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchUser()
  }, [accessToken, onUnauthorized, setUser])

  return { user, isLoading }
}
