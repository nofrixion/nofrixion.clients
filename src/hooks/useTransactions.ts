import { useEffect, useState } from 'react'
import { ApiError, Transaction } from '../types/ApiResponses'
import { TransactionsClient } from '../clients/TransactionsClient'
import { ApiProps, TransactionsProps } from '../types/props'

export const useTransactions = (
  { apiUrl, authToken }: ApiProps,
  { accountId, pageNumber, pageSize }: TransactionsProps,
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!accountId) {
          return
        }

        setIsLoading(true)

        const client = new TransactionsClient({ apiUrl, authToken })

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
  }, [accountId, authToken, pageNumber, pageSize, apiUrl])

  return { transactions, isLoading, apiError }
}
