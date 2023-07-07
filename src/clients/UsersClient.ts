import { ApiProps } from '../props/props'
import { ApiError, ApiResponse, HttpMethod, User } from '../responseTypes'
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
   * @param url The url to the accounts api.
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param onUnauthorized A callback function to be called when a 401 response is received.
   */
  constructor({ url, authToken, onUnauthorized }: ApiProps) {
    super(authToken, onUnauthorized)
    this.url = `${url}/user`
  }

  /**
   * Get the profile for the authenticated user.
   * @returns The user's profile if successful. An ApiError if not successful.
   */
  async getUser(): Promise<ApiResponse<User>> {
    return await this.httpRequest<User>(`${this.url}`, HttpMethod.GET)
  }
}
