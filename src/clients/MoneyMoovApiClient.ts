import { ApiProps } from '../props/props'
import { ClientSettingsClient } from './ClientSettingsClient'
import { PaymentRequestClient } from './PaymentRequestClient'

/**
 * The MoneyMoov Api Client provides access to the api endpoints in the MoneyMoov api.
 * Available apis are:
 * PaymentRequests
 */
export class MoneyMoovApiClient {
  apiBaseUrl: string
  authToken: string

  /**
   * Provides access to the MoneyMoov PaymentRequests api.
   */
  PaymentRequests: PaymentRequestClient

  /**
   * Provides access to the MoneyMoov ClientSettings api.
   */
  ClientSettings: ClientSettingsClient

  /**
   *
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param url The url to the accounts api.
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param onUnauthorized A callback function to be called when a 401 response is received.
   */
  constructor({ url, authToken, onUnauthorized }: ApiProps) {
    this.apiBaseUrl = url
    this.authToken = authToken

    this.PaymentRequests = new PaymentRequestClient({
      url: url,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
    this.ClientSettings = new ClientSettingsClient({
      url: url,
      authToken: authToken,
      onUnauthorized: onUnauthorized,
    })
  }
}
