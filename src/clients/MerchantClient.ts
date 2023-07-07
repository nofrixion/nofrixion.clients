import { ApiProps, MerchantProps } from '../props/props'
import { ApiError, Merchant, MerchantBankSettings, Tag } from '../responseTypes/ApiResponses'
import { HttpMethod } from '../responseTypes/Enums'
import { BaseApiClient } from './BaseApiClient'

/**
 * The MerchantClient provides access to the methods available
 * on the MoneyMoov Merchant API.
 */
export class MerchantClient extends BaseApiClient {
  apiUrl: string

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
    this.apiUrl = `${url}/merchants`
  }

  /**
   * Gets a list of merchants the user has access to.
   * @returns A list of merchants if successful. An ApiError if not successful.
   */
  async get(): Promise<{
    data?: Merchant[]
    error?: ApiError
  }> {
    const response = await this.httpRequest<Merchant[]>(`${this.apiUrl}`, HttpMethod.GET)

    return response
  }

  /**
   * Gets the bank settings of the merchant
   * @param merchantId The merchant id to get the bank settings for
   * @returns A MerchantBankSettings if successful. An ApiError if not successful.
   */
  async getBankSettings({ merchantId }: MerchantProps): Promise<{
    data?: MerchantBankSettings
    error?: ApiError
  }> {
    const response = await this.httpRequest<MerchantBankSettings>(
      `${this.apiUrl}/${merchantId}/banksettings`,
      HttpMethod.GET,
    )

    return response
  }

  /**
   * Gets the tags for the merchant
   * @param merchantId The merchant id to get the tags for
   * @returns A list of tags if successful. An ApiError if not successful.
   */
  async getTags({ merchantId }: MerchantProps): Promise<{
    data?: Tag[]
    error?: ApiError
  }> {
    const response = await this.httpRequest<Tag[]>(
      `${this.apiUrl}/${merchantId}/tags`,
      HttpMethod.GET,
    )

    return response
  }

  /**
   * Adds a tag to the merchant
   * @param merchantId The Merchant Id
   * @param tag The tag to add
   * @returns True if successfull. An ApiError if not successful.
   */
  async addTag(
    { merchantId }: MerchantProps,
    tag: Tag,
  ): Promise<{
    data?: Tag
    error?: ApiError
  }> {
    const response = await this.httpRequest<Tag>(
      `${this.apiUrl}/${merchantId}/tags`,
      HttpMethod.POST,
      tag,
    )

    return response
  }

  /**
   * Deletes a Tag
   * @param merchantId The Merchant Id
   * @param tagId The Tag Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async deleteTag(
    { merchantId }: MerchantProps,
    tagId: string,
  ): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${merchantId}/tags/${tagId}`,
      HttpMethod.DELETE,
    )

    return !response.error ? { success: true } : { success: false, error: response.error }
  }
}
