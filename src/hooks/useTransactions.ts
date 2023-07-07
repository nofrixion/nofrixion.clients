import { useEffect, useState } from 'react'
import { ApiError, Transaction } from '../responseTypes/ApiResponses'
import { TransactionsClient } from '../clients/TransactionsClient'
import { ApiProps } from '../props/props'

export const useTransactions = (
  { url, authToken, onUnauthorized }: ApiProps,
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
        if (!authToken || !accountId) {
          return
        }

        setIsLoading(true)

        const client = new TransactionsClient({ url, authToken, onUnauthorized })

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
  }, [accountId, authToken, onUnauthorized, pageNumber, pageSize, url])

  return { transactions, isLoading, apiError }
}
