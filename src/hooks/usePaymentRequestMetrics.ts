import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequestMetrics } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestMetricsProps } from '../types/props'

export const usePaymentRequestMetrics = (
  {
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  }: usePaymentRequestMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPaymentRequestMetrics = async () => {
      if (!merchantId) {
        return
      }

      setIsLoading(true)

      const client = new PaymentRequestClient({ apiUrl, authToken })

      const response = await client.metrics({
        fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
        toDate: toDateMS ? new Date(toDateMS) : undefined,
        search: search,
        currency: currency,
        minAmount: minAmount,
        maxAmount: maxAmount,
        tags: tags,
        merchantId: merchantId,
      })

      if (response.status === 'success') {
        setMetrics(response.data)
      } else {
        setApiError(response.error)
      }
      setIsLoading(false)
    }

    fetchPaymentRequestMetrics()
  }, [
    authToken,
    merchantId,
    currency,
    minAmount,
    maxAmount,
    tags,
    apiUrl,
    search,
    fromDateMS,
    toDateMS,
  ])

  return {
    metrics,
    apiError,
    isLoading,
  }
}
