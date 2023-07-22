import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequest } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestProps } from '../types/props'

export const usePaymentRequest = (
  { paymentRequestId, merchantId }: usePaymentRequestProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>()
  const [apiError, setApiError] = useState<ApiError>()

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const client = new PaymentRequestClient({ apiUrl, authToken })
      const response = await client.get({ paymentRequestId, merchantId })

      if (response.status === 'success') {
        setPaymentRequest(response.data)
      } else {
        setApiError(response.error)
      }
    }

    fetchPaymentRequest()
  }, [paymentRequestId, authToken, merchantId, apiUrl])

  return {
    paymentRequest,
    apiError,
  }
}
