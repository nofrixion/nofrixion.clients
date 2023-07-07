import { ApiProps, MerchantProps } from '../props/props'
import { Account, ApiError, HttpMethod } from '../responseTypes'
import { BaseApiClient } from './BaseApiClient'

/**
 * The AccountsClient provides access to the methods available
 * on the MoneyMoov Accounts api.
 */
export class AccountsClient extends BaseApiClient {
  url: string

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param url The url to the accounts api.
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param onUnauthorized A callback function to be called when a 401 response is received.
   */
  constructor({ url, authToken, onUnauthorized }: ApiProps) {
    super(authToken, onUnauthorized)
    this.url = `${url}/accounts`
  }

  /**
   * Get a list of accounts.
   * @param merchantId Optional. The merchant id to filter by.
   * @returns A list of accounts by merchantId or user if successful. An ApiError if not successful.
   */
  async getAccounts({ merchantId }: MerchantProps): Promise<{
    data?: Account[]
    error?: ApiError
  }> {
    const response = await this.httpRequest<Account[]>(
      `${this.url}/?merchantID=${merchantId}`,
      HttpMethod.GET,
    )

    return response
  }
}
