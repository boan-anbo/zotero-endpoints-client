import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { SearchCondition } from './types/search-condition'
import type { JoinMode, SearchRequest } from './types/search-request'
import type { GetZoteroItemOptions } from './types/get-zotero-item-options'
import type { ZoteroItemWithMetadata } from './types/complete-zotero-item'
import type { ZoteroEndpointsResponse } from './types/zotero-endpoints-response'

export class ZoteroEndpointsClient {
  baseUrl = 'http://127.0.0.1:23119/endpoints'

  constructor() {

  }

  /**
     * Search Zotero for items matching the given query.
     */
  async searchItems(conditions: SearchCondition[], joinMode?: JoinMode, opt?: GetZoteroItemOptions): Promise<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>> {
    const url = `${this.baseUrl}/search/items`
    const { data } = await axios.post<SearchRequest, AxiosResponse<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>>>(url, {
      conditions,
      joinMode,
    }, {
      params: { ...opt },
    })
    return data ?? []
  }
}
