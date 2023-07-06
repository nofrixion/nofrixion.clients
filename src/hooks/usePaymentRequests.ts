import { useEffect, useState } from 'react'
import { SortDirection } from '../responseTypes/Enums'
import { formatPaymentRequestSortExpression } from '../responseTypes/formatters'
import { ApiError, PaymentRequest } from '../responseTypes/ApiResponses'
import { PaymentRequestStatus } from '../responseTypes/Enums'
import { PaymentRequestClient } from '../clients'

export const usePaymentRequests = (
  apiUrl: string,
  authToken: string,
  merchantId: string,
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  contactSortDirection: SortDirection,
  amountSortDirection: SortDirection,
  onUnauthorized: () => void,
  page: number,
  pageSize?: number,
  fromDateMs?: number,
  toDateMs?: number,
  status?: PaymentRequestStatus,
  searchFilter?: string,
  currency?: string,
  minAmount?: number,
  maxAmount?: number,
  tags?: string[],
) => {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[] | undefined>(undefined)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalRecords, setTotalRecords] = useState(1)
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPaymentRequests = async () => {
      setIsLoading(true)

      const client = new PaymentRequestClient(apiUrl, authToken, merchantId, onUnauthorized)

      const response = await client.getAll(
        page,
        pageSize,
        sortExpression,
        new Date(fromDateMs ?? 0),
        new Date(toDateMs ?? 0),
        status,
        searchFilter,
        currency,
        minAmount,
        maxAmount,
        tags,
      )

      if (response.data) {
        setPaymentRequests(response.data.content)
        setPageNumber(response.data.pageNumber)
        setTotalRecords(response.data.totalSize)
      } else if (response.error) {
        setApiError(response.error)
      }

      setIsLoading(false)
    }

    // Build the sort expression
    const sortExpression = formatPaymentRequestSortExpression(
      statusSortDirection,
      createdSortDirection,
      contactSortDirection,
      amountSortDirection,
    )

    fetchPaymentRequests()
  }, [
    page,
    apiUrl,
    merchantId,
    authToken,
    pageSize,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    fromDateMs,
    toDateMs,
    status,
    searchFilter,
    currency,
    minAmount,
    maxAmount,
    tags,
    onUnauthorized,
  ])

  return {
    paymentRequests,
    pageNumber,
    totalRecords,
    apiError,
    isLoading,
  }
}
