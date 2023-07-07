import { useEffect, useState } from 'react'
import { PaymentRequestClient } from '../clients/PaymentRequestClient'
import { ApiError, PaymentRequestMetrics } from '../responseTypes/ApiResponses'
import { usePaymentRequestMetricsProps } from '../props/props'

export const usePaymentRequestMetrics = (
  {
    url,
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  }: usePaymentRequestMetricsProps,
  onUnauthorized: () => void,
  authToken?: string,
) => {
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const [apiError, setApiError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPaymentRequestMetrics = async () => {
      if (!authToken || !merchantId) {
        return
      }

      setIsLoading(true)

      const client = new PaymentRequestClient(url, authToken, onUnauthorized)

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

      if (response.data) {
        setMetrics(response.data)
      } else if (response.error) {
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
    onUnauthorized,
    url,
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
