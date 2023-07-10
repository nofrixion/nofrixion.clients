import { useEffect, useState } from 'react'
import { Account, ApiError } from '../types/ApiResponses'
import { AccountsClient } from '../clients/AccountsClient'
import { ApiProps, MerchantProps } from '../types/props'

export const useAccounts = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken, onUnauthorized }: ApiProps,
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

        const client = new AccountsClient({ apiUrl, authToken, onUnauthorized })
        const response = await client.getAccounts({ merchantId: merchantId })

        if (response.status === 'success') {
          setAccounts(response.data)
        } else {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchAccounts()
  }, [authToken, merchantId, onUnauthorized, apiUrl])

  return { accounts, isLoading, apiError }
}
