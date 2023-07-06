import { useEffect, useState } from 'react'
import { Account, ApiError } from '../responseTypes/ApiResponses'
import { AccountsClient } from '../clients/AccountsClient'

export const useAccounts = (
  apiUrl: string,
  onUnauthorized: () => void,
  merchantId?: string,
  accessToken?: string,
) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!accessToken || !merchantId) {
          return
        }

        setIsLoading(true)

        const client = new AccountsClient(apiUrl, accessToken, onUnauthorized)
        const response = await client.getAccounts(merchantId)

        if (response.data) {
          setAccounts(response.data)
        } else if (response.error) {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchAccounts()
  }, [accessToken, apiUrl, merchantId, onUnauthorized])

  return { accounts, isLoading, apiError }
}
