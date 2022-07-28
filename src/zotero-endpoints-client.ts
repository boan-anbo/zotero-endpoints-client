import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { SearchCondition } from './types/search-condition'
import type { JoinMode, SearchRequest } from './types/search-request'
import type { GetZoteroItemOptions } from './types/get-zotero-item-options'
import type { ZoteroItemWithMetadata } from './types/complete-zotero-item'
import type { ZoteroEndpointsResponse } from './types/zotero-endpoints-response'
import { ClientType } from './types/client-type'
import { RequestData } from './types/request-data'
import { paramBuilder } from './utils/params_builder'

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

  /**
   * Item operations.
   */

  /**
   * Item selections.
   */
  getSelectedItemsRequest(opt?: GetZoteroItemOptions): RequestData<null> {
    const url = `${this.baseUrl}/items/selected`
    return new RequestData<null>(url, 'GET', { ...opt }, null)
  }

  async getSelectedItems(opt?: GetZoteroItemOptions): Promise<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>> {
    const request = this.getSelectedItemsRequest(opt)
    const { data } = await axios.get<null, AxiosResponse<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>>>(request.url, {
      params: request.params,
    })
    return data
  }

  getSelectAnyItemRequest(opt?: GetZoteroItemOptions): RequestData<null> {
    const url = `${this.baseUrl}/select/any`
    return new RequestData<null>(url, 'GET', { ...opt }, null)
  }

  /**
   * Select an item, default to the sorted first item, in the current collection if none is selected.
   * @param opt {@link GetZoteroItemOptions}
   */
  async getSelectAnyItem(opt?: GetZoteroItemOptions): Promise<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>> {
    const request = this.getSelectAnyItemRequest(opt)
    const { data } = await axios.get<null, AxiosResponse<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>>>(request.url, {
      params: request.params,
    })
    return data
  }

  /**
   * Collection operations
   *
   *

   /**
   * Get the current collection.
   * @param itemUris: Zotero URIs
   * @param opt {@link GetZoteroItemOptions}
   */
  getAddItemToCollectionByUri(itemUris: string [], opt?: GetZoteroItemOptions): RequestData<null> {
    // make sure the itemUris is an array with at least one element and no empty string
    if (!itemUris || !itemUris.length || itemUris.some(uri => !uri))
      throw new Error('itemUris must be an array with at least one element and no empty string')

    const url = `${this.baseUrl}/collection/addToCurrent`
    return new RequestData<null>(url, 'GET', paramBuilder({ ...opt, uris: itemUris }), null)
  }

  /**
   * Add items to the current collection.
   * @param itemUris
   * @param opt
   */
  async addItemToCollectionByUri(itemUris: string [], opt?: GetZoteroItemOptions): Promise<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>> {
    const request = this.getAddItemToCollectionByUri(itemUris, opt)
    const { data } = await axios.get<null, AxiosResponse<ZoteroEndpointsResponse<ZoteroItemWithMetadata[]>>>(request.url, {
      params: request.params,
    })
    return data
  }
}
