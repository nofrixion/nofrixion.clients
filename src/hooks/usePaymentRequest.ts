import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequest } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestProps } from '../types/props'

export const usePaymentRequest = (
  { paymentRequestId, merchantId }: usePaymentRequestProps,
  { apiUrl, authToken, onUnauthorized }: ApiProps,
) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const client = new PaymentRequestClient({ apiUrl, authToken, onUnauthorized })
      const response = await client.get({ paymentRequestId, merchantId })

      if (response.status === 'success') {
        setPaymentRequest(response.data)
      } else {
        setApiError(response.error)
      }
    }

    fetchPaymentRequest()
  }, [paymentRequestId, authToken, merchantId, onUnauthorized, apiUrl])

  return {
    paymentRequest,
    apiError,
  }
}
