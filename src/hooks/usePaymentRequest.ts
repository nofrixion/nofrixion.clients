import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequest } from '../responseTypes/ApiResponses'
import { ApiProps, usePaymentRequestProps } from '../props/props'

export const usePaymentRequest = (
  { paymentRequestId, merchantId }: usePaymentRequestProps,
  { url, authToken, onUnauthorized }: ApiProps,
) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const client = new PaymentRequestClient({ url, authToken, onUnauthorized })
      const response = await client.get({ paymentRequestId, merchantId })

      if (response.status === 'success') {
        setPaymentRequest(response.data)
      } else {
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
