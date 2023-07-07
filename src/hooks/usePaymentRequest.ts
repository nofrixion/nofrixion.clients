import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequest } from '../responseTypes/ApiResponses'
import { usePaymentRequestProps } from '../props/props'

export const usePaymentRequest = (
  { paymentRequestId, merchantId, url }: usePaymentRequestProps,
  authToken: string,
  onUnauthorized: () => void,
) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const client = new PaymentRequestClient(url, authToken, onUnauthorized)
      const response = await client.get({ paymentRequestId, merchantId })

      if (response.data) {
        setPaymentRequest(response.data)
      } else if (response.error) {
        setApiError(response.error)
      }
    }

    fetchPaymentRequest()
  }, [paymentRequestId, authToken, merchantId, onUnauthorized, url])

  return {
    paymentRequest,
    apiError,
  }
}
