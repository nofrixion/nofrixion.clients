import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequest } from '../types/ApiResponses'

export const usePaymentRequest = (
  paymentRequestId: string,
  apiUrl: string,
  authToken: string,
  merchantId: string,
  onUnauthorized: () => void,
) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const client = new PaymentRequestClient(apiUrl, authToken, merchantId, onUnauthorized)
      const response = await client.get(paymentRequestId)

      if (response.data) {
        setPaymentRequest(response.data)
      } else if (response.error) {
        setApiError(response.error)
      }
    }

    fetchPaymentRequest()
  }, [paymentRequestId, apiUrl, authToken, merchantId, onUnauthorized])

  return {
    paymentRequest,
    apiError,
  }
}