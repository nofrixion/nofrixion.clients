import { useEffect, useState } from 'react'
import { formatPaymentRequestSortExpression } from '../responseTypes/formatters'
import { ApiError, PaymentRequest } from '../responseTypes/ApiResponses'
import { PaymentRequestClient } from '../clients'
import { ApiProps, usePaymentRequestsProps } from '../props/props'

export const usePaymentRequests = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber: initialPageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  }: usePaymentRequestsProps,
  { url, authToken, onUnauthorized }: ApiProps,
) => {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[] | undefined>(undefined)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalRecords, setTotalRecords] = useState(1)
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPaymentRequests = async () => {
      if (!authToken || !merchantId) {
        return
      }

      setIsLoading(true)

      const client = new PaymentRequestClient({ url, authToken, onUnauthorized })

      const response = await client.getAll({
        pageNumber: initialPageNumber,
        pageSize: pageSize,
        sort: sortExpression,
        fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
        toDate: toDateMS ? new Date(toDateMS) : undefined,
        status: status,
        search: search,
        currency: currency,
        minAmount: minAmount,
        maxAmount: maxAmount,
        tags: tags,
        merchantId: merchantId,
      })

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
    merchantId,
    authToken,
    pageSize,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    status,
    currency,
    minAmount,
    maxAmount,
    tags,
    onUnauthorized,
    pageNumber,
    fromDateMS,
    search,
    url,
    initialPageNumber,
    toDateMS,
  ])

  return {
    paymentRequests,
    pageNumber,
    totalRecords,
    apiError,
    isLoading,
  }
}
