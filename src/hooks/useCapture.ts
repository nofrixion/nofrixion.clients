import { useCallback, useState } from 'react'
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError } from '../types'
import { PaymentRequestClient } from '../clients'
import { ApiProps, CaptureProps } from '../types/props'

const capture = async (
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
  const response = await client.captureCardPayment(paymentRequestId, authorizationId, amount)

  return response
}

export const useCapture = (
  merchantId: string,
  { apiUrl, authToken }: ApiProps,
): {
  processCapture: (captureProps: CaptureProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [paymentRequestID, setPaymentRequestID] = useState<string>()

  const SINGLE_PAYMENT_REQUEST_QUERY_KEY = [
    'PaymentRequest',
    merchantId,
    paymentRequestID,
    apiUrl,
    authToken,
  ]

  // When this mutation succeeds, invalidate any queries with the single payment request query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    CaptureProps
  > = useMutation({
    mutationFn: (variables: CaptureProps) =>
      capture(
        apiUrl,
        variables.authorizationId,
        variables.paymentRequestId,
        authToken,
        variables.amount,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
      }
    },
  })

  const processCapture = useCallback(
    async ({ authorizationId, paymentRequestId, amount }: CaptureProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({
          authorizationId,
          paymentRequestId,
          amount,
        })

        if (result.success) {
          return { error: undefined }
        } else {
          return { error: result.error }
        }
      }
      return { error: undefined }
    },
    [mutation],
  )

  return { processCapture }
}
