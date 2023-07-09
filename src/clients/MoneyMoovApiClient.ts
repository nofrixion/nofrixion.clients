import { ApiProps } from '../types/props'
import { AccountsClient } from './AccountsClient'
import { ClientSettingsClient } from './ClientSettingsClient'
import { MerchantClient } from './MerchantClient'
import { PaymentRequestClient } from './PaymentRequestClient'
import { TransactionsClient } from './TransactionsClient'
import { UsersClient } from './UsersClient'

/**
 * The MoneyMoov Api Client provides access to the api endpoints in the MoneyMoov api.
 */
export class MoneyMoovApiClient {
  apiUrl: string
  authToken: string | undefined

  /**
   * Provides access to the MoneyMoov PaymentRequests api.
   */
  PaymentRequests: PaymentRequestClient

  /**
   * Provides access to the MoneyMoov ClientSettings api.
   */
  ClientSettings: ClientSettingsClient

  /**
   * Provides access to the MoneyMoov Merchants api.
   */
  Merchants: MerchantClient

  /**
   * Provides access to the MoneyMoov Accounts api.
   */
  Accounts: AccountsClient

  /**
   * Provides access to the MoneyMoov Transactions api.
   */
  Transactions: TransactionsClient

  /**
   * Provides access to the MoneyMoov Users api.
   */
  Users: UsersClient

  /**
   *
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param onUnauthorized A callback function to be called when a 401 response is received.
   */
  constructor({ apiUrl, authToken, onUnauthorized }: ApiProps) {
    this.apiUrl = apiUrl
    this.authToken = authToken

    this.PaymentRequests = new PaymentRequestClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.ClientSettings = new ClientSettingsClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.Merchants = new MerchantClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.Accounts = new AccountsClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.Transactions = new TransactionsClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.Users = new UsersClient({
      apiUrl,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
  }
}
