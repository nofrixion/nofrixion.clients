import { ApiError, HttpMethod, User } from '../responseTypes'
import { BaseApiClient } from './BaseApiClient'

/**
 * The UsersClient provides access to the methods available
 * on the MoneyMoov Users api.
 */
export class UsersClient extends BaseApiClient {
  url: string

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor(apiBaseUrl: string, authToken: string, onUnauthorized: () => void) {
    super(authToken, onUnauthorized)
    this.url = `${apiBaseUrl}/user`
  }

  /**
   * Get the profile for the authenticated user.
   * @returns The user's profile if successful. An ApiError if not successful.
   */
  async getUser(): Promise<{
    data?: User
    error?: ApiError
  }> {
    const response = await this.httpRequest<User>(`${this.url}`, HttpMethod.GET)

    return response
  }
}
