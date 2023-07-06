import { useEffect, useState } from 'react'
import { NOFRIXION_API_URL } from '../constants'
import { Transaction, TransactionPageResponse } from '../types/localTypes'

export const useTransactions = (
  accessToken?: string,
  accountId?: string,
  pageSize?: number,
  onUnauthorized?: () => void,
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!accessToken || !accountId) {
          return
        }

        setIsLoading(true)

        // Just using pageSize for now, but we'll need to add pagination
        // and use the new MoneyMoov client when it's available
        const response = await fetch(
          `${NOFRIXION_API_URL}/transactions/${accountId}?pageSize=${pageSize}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (response.status === 401) {
          setIsLoading(false)
          onUnauthorized && onUnauthorized()
          return
        }

        const transactionPage = (await response.json()) as TransactionPageResponse

        setTransactions(transactionPage?.content)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return []
      }
    }

    fetchTransactions()
  }, [accessToken, accountId, onUnauthorized, pageSize])

  return { transactions, isLoading }
}
