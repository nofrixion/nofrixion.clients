import { SortDirection } from '../responseTypes'

export interface PagedResponseProps
  extends ApiProps,
    FilterResponseProps,
    MerchantProps,
    AccountProps {
  pageNumber?: number
  pageSize?: number
  status?: string
}

export interface PaymentRequestPageProps
  extends PagedResponseProps,
    FilterResponseProps,
    PaymentRequestProps,
    MerchantProps {}

export interface PaymentRequestProps {
  paymentRequestId?: string
  includeEvents?: boolean
}

export interface FilterResponseProps {
  fromDate?: Date
  toDate?: Date
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  tags?: string[]
  sort?: string
}

export interface MetricsProps extends FilterResponseProps, MerchantProps {}

export interface ApiProps {
  url: string
}

export interface MerchantProps {
  merchantId?: string
}

export interface AccountProps {
  accountId?: string
}

export interface PaymentRequestProps {
  paymentRequestId?: string
  includeEvents?: boolean
  merchantId?: string
}

export interface useAccountsProps extends ApiProps, MerchantProps {}

export interface useBanksProps extends ApiProps, MerchantProps {}

export interface useMerchantTagsProps extends ApiProps, MerchantProps {}

export interface usePaymentRequestProps extends ApiProps, MerchantProps, PaymentRequestProps {
  merchantId: string
}

export interface usePaymentRequestsProps
  extends ApiProps,
    MerchantProps,
    PaymentRequestProps,
    PaymentRequestPageProps {
  merchantId: string
  statusSortDirection: SortDirection
  createdSortDirection: SortDirection
  contactSortDirection: SortDirection
  amountSortDirection: SortDirection
  fromDateMS?: number
  toDateMS?: number
}

export interface usePaymentRequestMetricsProps extends ApiProps, MetricsProps {
  fromDateMS?: number
  toDateMS?: number
}
