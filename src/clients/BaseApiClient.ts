import axios, { AxiosError } from 'axios'
import { ApiError } from '../responseTypes/ApiResponses'
import { HttpMethod } from '../responseTypes/Enums'
import { PagedResponseProps } from '../props/props'

export abstract class BaseApiClient {
  authToken: string
  onUnauthorized: () => void
  debug: boolean

  constructor(authToken: string, onUnauthorized: () => void, debug?: boolean) {
    this.authToken = authToken
    this.onUnauthorized = onUnauthorized
    this.debug = debug ?? false
  }

  /**
   * Gets a paged response from supporting api endpoints
   * @param url The api url
   * @param merchantId The merchant id
   * @param pageNumber The page number
   * @param pageSize The page size
   * @param sort Optional. The sort expression
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param status Optional. The status filter to apply to retrieve records with this status.
   * @param search Optional. The search filter to apply to retrieve records with this search text in the description, title, merchant name or contact name.
   * @param currency Optional. The currency filter to apply to retrieve records with this currency.
   * @param minAmount Optional. The minimum amount filter to apply to retrieve records with this minimum amount.
   * @param maxAmount Optional. The maximum amount filter to apply to retrieve records with this maximum amount.
   * @param tags Optional. The tags filter to apply to retrieve records with these tags.
   * @param accountId Optional. The account id filter to apply to retrieve records with this account id.
   * @returns A Paged response of type TResponse if successful. An ApiError if not successful.
   */
  protected async getPagedResponse<TResponse>({
    url: url,
    merchantId: merchantId,
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sort,
    fromDate: fromDate,
    toDate: toDate,
    status: status,
    search: search,
    currency: currency,
    minAmount: minAmount,
    maxAmount: maxAmount,
    tags: tags,
    accountId: accountId,
  }: PagedResponseProps): Promise<{
    data?: TResponse
    error?: ApiError
  }> {
    const filterParams = new URLSearchParams()

    if (pageNumber) {
      filterParams.append('page', pageNumber.toString())
      filterParams.append('pageNumber', pageNumber.toString())
    }

    if (pageSize) {
      filterParams.append('size', pageSize.toString())
      filterParams.append('pageSize', pageSize.toString())
    }

    if (merchantId) {
      filterParams.append('merchantID', merchantId)
    }

    if (sort) {
      filterParams.append('sort', sort)
    }

    if (fromDate) {
      filterParams.append('fromDate', fromDate.toUTCString())
    }

    if (toDate) {
      filterParams.append('toDate', toDate.toUTCString())
    }

    if (status) {
      filterParams.append('status', status)
    }

    if (search) {
      filterParams.append('search', search)
    }

    if (currency) {
      filterParams.append('currency', currency)
    }

    if (minAmount) {
      filterParams.append('minAmount', minAmount.toString())
    }

    if (maxAmount) {
      filterParams.append('maxAmount', maxAmount.toString())
    }

    if (tags) {
      tags.forEach((tag) => filterParams.append('tags', tag))
    }

    if (accountId) {
      filterParams.append('accountId', accountId)
    }

    url = `${url}?${filterParams.toString()}`

    return await this.httpRequest<TResponse>(url, HttpMethod.GET)
  }

  /**
   * Performs a http request to the MoneyMoov api.
   * @param url The request url
   * @param method The Http Method.
   * @param postData Optional. The data to post if specified.
   * @returns A response of type TResponse if successful. An ApiError if not successful.
   */
  protected async httpRequest<TResponse>(
    url: string,
    method: HttpMethod,
    postData?: unknown,
  ): Promise<{
    data?: TResponse
    error?: ApiError
  }> {
    if (this.debug) {
      console.log(`Requesting: ${method} ${url}`)
    }

    let contentType = 'application/json'

    // Send form encoding on POST and PUT
    // Axios will automatically serialize the postData object to form urlencoded format
    if (method === HttpMethod.POST || method === HttpMethod.PUT) {
      contentType = 'application/x-www-form-urlencoded'
    }

    try {
      const { data } = await axios<TResponse>({
        method: method,
        url: url,
        data: postData,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          'content-type': contentType,
        },
      })

      return {
        data: data,
      }
    } catch (ex) {
      // Axios will throw an exception for all errors

      const error = ex as AxiosError

      if (error.response?.status === 401) {
        // Unauthorized
        this.onUnauthorized()
      }

      if (error.response?.data) {
        // This contains the problem details

        if (this.debug) {
          console.log('Received error from api. : ' + JSON.stringify(error.response?.data))
        }

        return {
          error: error.response?.data as ApiError,
        }
      }

      return {
        error: {
          type: error.code,
          title: 'MoneyMoov Api Error.',
          status: error.status,
          detail: error.message,
        },
      }
    }
  }
}
