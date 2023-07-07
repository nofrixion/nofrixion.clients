import { useEffect, useState } from 'react'
import { Account, ApiError } from '../responseTypes/ApiResponses'
import { AccountsClient } from '../clients/AccountsClient'
import { useAccountsProps } from '../props/props'

export const useAccounts = (
  { url, merchantId }: useAccountsProps,
  onUnauthorized: () => void,
  authToken?: string,
) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!authToken || !merchantId) {
          return
        }

        setIsLoading(true)

        const client = new AccountsClient(url, authToken, onUnauthorized)
        const response = await client.getAccounts({ merchantId: merchantId })

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
  }, [authToken, merchantId, onUnauthorized, url])

  return { accounts, isLoading, apiError }
}
