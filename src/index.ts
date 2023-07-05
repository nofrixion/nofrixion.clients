import {
  useBanks,
  useMerchantTags,
  usePaymentRequest,
  usePaymentRequestMetrics,
  usePaymentRequests,
  useUserPaymentDefaults,
} from './hooks'
import {
  ClientSettingsClient,
  MerchantClient,
  MoneyMoovApiClient,
  PaymentRequestClient,
} from './clients'
import * as Types from './types'

const hooks = {
  useBanks: useBanks,
  useMerchantTags: useMerchantTags,
  usePaymentRequest: usePaymentRequest,
  usePaymentRequestMetrics: usePaymentRequestMetrics,
  usePaymentRequests: usePaymentRequests,
  useUserPaymentDefaults: useUserPaymentDefaults,
}

const clients = {
  clientSettingsClient: ClientSettingsClient,
  merchantClient: MerchantClient,
  moneyMoovApiClient: MoneyMoovApiClient,
  paymentRequestClient: PaymentRequestClient,
}

const types = {
  ...Types,
}

export { hooks, clients, types }
