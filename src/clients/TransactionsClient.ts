import { ApiProps, TransactionsProps } from '../props/props'
import { ApiError, TransactionPageResponse } from '../responseTypes/ApiResponses'
import { BaseApiClient } from './BaseApiClient'

/**
 * The TransactionsRequestClient provides access to the methods available
 * on the MoneyMoov Transactions api.
 */
export class TransactionsClient extends BaseApiClient {
  apiUrl: string

  /**
   * @param apiBaseUrl The base api url.
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param authToken The OAUTH token used to authenticate with the api.
   * @param onUnauthorized A callback function to call when the api returns a 401 Unauthorized response.
   */
  constructor({ url, authToken, onUnauthorized }: ApiProps) {
    super(authToken, onUnauthorized)
    this.apiUrl = `${url}/transactions`
  }

  /**
   * Gets a paged list of Transactions
   * @param accountId The account id to get the transactions for
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @returns A TransactionPageResponse if successful. An ApiError if not successful.
   */
  async get({ accountId, pageNumber, pageSize, fromDate, toDate }: TransactionsProps): Promise<{
    data?: TransactionPageResponse
    error?: ApiError
  }> {
    return await this.getPagedResponse<TransactionPageResponse>(
      {
        accountId: accountId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        fromDate: fromDate,
        toDate: toDate,
      },
      this.apiUrl,
    )
  }
}
