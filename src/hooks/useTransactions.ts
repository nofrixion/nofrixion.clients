import { useEffect, useState } from 'react'
import { ApiError, Transaction } from '../responseTypes/ApiResponses'
import { TransactionsClient } from '../clients/TransactionsClient'

export const useTransactions = (
  apiUrl: string,
  onUnauthorized: () => void,
  accessToken?: string,
  accountId?: string,
  pageNumber?: number,
  pageSize?: number,
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!accessToken || !accountId) {
          return
        }

        setIsLoading(true)

        const client = new TransactionsClient(apiUrl, accessToken, onUnauthorized)

        const response = await client.get(accountId, pageNumber, pageSize)

        if (response.data) {
          setTransactions(response.data.content)
        } else if (response.error) {
          setApiError(response.error)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchTransactions()
  }, [accessToken, accountId, apiUrl, onUnauthorized, pageNumber, pageSize])

  return { transactions, isLoading, apiError }
}
