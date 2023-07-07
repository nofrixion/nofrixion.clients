import { useEffect, useState } from 'react'
import { ApiError, Transaction } from '../responseTypes/ApiResponses'
import { TransactionsClient } from '../clients/TransactionsClient'
import { ApiProps, TransactionsProps } from '../props/props'

export const useTransactions = (
  { url, authToken, onUnauthorized }: ApiProps,
  { accountId, pageNumber, pageSize }: TransactionsProps,
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

        const response = await client.get({ accountId, pageNumber, pageSize })

        if (response.status === 'success') {
          setTransactions(response.data.content)
        } else {
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
