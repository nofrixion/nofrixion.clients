import { useCallback } from 'react'
import { PaymentRequestClient } from '../clients'
import { ApiError } from '../types/ApiResponses'
import { ApiProps, RefundProps, usePaymentRequestsProps } from '../types/props'
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'

const refund = async (
  apiUrl: string,
  authorizationId: string,
  paymentRequestId: string,
  authToken?: string,
  amount?: number,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })
  const response = await client.refundCardPayment(paymentRequestId, authorizationId, amount)

  return response
}

export const useRefund = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
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
  { apiUrl, authToken }: ApiProps,
): {
  processRefund: (refundProps: RefundProps) => Promise<{ error: string | undefined }>
} => {
  const queryClient = useQueryClient()

  const QUERY_KEY = [
    'PaymentRequests',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  ]
  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    RefundProps
  > = useMutation({
    mutationFn: (variables: RefundProps) =>
      refund(
        apiUrl,
        variables.authorizationId,
        variables.paymentRequestId,
        authToken,
        variables.amount,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  const processRefund = useCallback(
    async ({ authorizationId, paymentRequestId, amount }: RefundProps) => {
      if (paymentRequestId) {
        mutation.mutate({
          authorizationId,
          paymentRequestId,
          amount,
        })
      }

      if (mutation.data?.error) {
        return { error: mutation.data?.error.detail }
      } else {
        return { error: undefined }
      }
    },
    [mutation],
  )

  return { processRefund }
}
