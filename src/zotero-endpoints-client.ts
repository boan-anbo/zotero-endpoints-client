import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { http, tauri } from '@tauri-apps/api'
import { Body, getClient } from '@tauri-apps/api/http'
import { p } from '@antfu/utils'
import type { SearchCondition } from './types/search-condition'
import type { JoinMode, SearchRequest } from './types/search-request'
import type { GetZoteroItemOptions } from './types/get-zotero-item-options'
import type { ZoteroItemWithMetadata } from './types/complete-zotero-item'
import type { ZoteroEndpointsResponse } from './types/zotero-endpoints-response'
import { ClientType } from './types/client-type'
import { RequestData } from './types/request-data'

/**
 * Since Zotero API allows only local request, I do not include HTTP client such as Tauri Apps API in here because this is a Node library.
 * For those using this client in the browser, they can get the request data instead and send the request data using Tauri Apps API or other browser http clients.
 */
export class ZoteroEndpointsClient {
  baseUrl = 'http://127.0.0.1:23119/endpoints'
  clientType: ClientType

  constructor(clientType: ClientType = ClientType.AXIOS_CLIENT) {
    this.clientType = clientType
  }

  /**
     * Search Zotero for items matching the given query.
     */
  async searchItems(conditions: SearchCondition[], joinMode?: JoinMode, opt?: GetZoteroItemOptions): Promise<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>> {
    const request = this.getSearchItemsRequest(conditions, joinMode, opt)
    const { data } = await axios.post<SearchRequest, AxiosResponse<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>>>(request.url, request.payload, {
      params: request.params,
    })

    return data
  }

  getSearchItemsRequest(conditions: SearchCondition[], joinMode?: JoinMode, opt?: GetZoteroItemOptions): RequestData<SearchRequest> {
    const url = `${this.baseUrl}/search/items`
    const payload = {
      conditions,
      joinMode,
    }
    const params = {
      ...opt,
    }
    return new RequestData<SearchRequest>(url, 'POST', params, payload)
  }
}
