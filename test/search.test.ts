import { assert, describe, expect, it } from 'vitest'
import { ZoteroEndpointsClient } from '../src'
import { ClientType } from '../src/types/client-type'

describe('should be able to search', async () => {
  it('should search by conditions with or without citations', async () => {
    const axiosClient = new ZoteroEndpointsClient()
    const tauriClient = new ZoteroEndpointsClient(ClientType.TAURI_HTTP_CLIENT)
    // One result without citation
    const conditions = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    const resultOne = await axiosClient.searchItems(conditions)
    const resultOneTauri = await tauriClient.searchItems(conditions)
    expect(resultOne.payload.length).toEqual(1)
    expect(resultOneTauri.payload.length).toEqual(1)
    expect(resultOne.payload[0].citation).toEqual(undefined)
    expect(resultOneTauri.payload[0].citation).toEqual(undefined)
    // One result with citation
    const conditionsWithIncludeCitation = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    const params = { includeCitation: true }
    const resultTwo = await axiosClient.searchItems(conditionsWithIncludeCitation, undefined, params)
    expect(resultTwo.payload.length).toEqual(1)
    expect(resultTwo.payload[0].citation).not.undefined
    // No result
    const conditionsWithNoResults = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2021' },
    ]
    const resultThree = await axiosClient.searchItems(conditionsWithNoResults)
    expect(resultThree.payload.length).toEqual(0)
    // two conditions ANY
    const conditionsWithOr = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
      { field: 'citationKey', operator: 'is', query: 'burrellSocietyAlgorithms2021' },
    ]
    const resultFour = await axiosClient.searchItems(conditionsWithOr, 'ANY', params)
    expect(resultFour.payload.length).toEqual(2)
    // two conditions ALL
    const conditionsWithAnd = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
      { field: 'citationKey', operator: 'is', query: 'burrellSocietyAlgorithms2021' },
    ]
    const resultFive = await axiosClient.searchItems(conditionsWithAnd, 'ALL', params)
    expect(resultFive.payload.length).toEqual(0)
  })

  it('should get search request with correct params', () => {
    const client = new ZoteroEndpointsClient()
    const conditions = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    const result = client.getSearchItemsRequest(conditions, 'ANY', { includeCitation: true })
    expect(result.payload?.conditions).toEqual(conditions)
    expect(result.payload?.joinMode).toEqual('ANY')
    expect(result.params?.includeCitation).toEqual('true')
    expect(result.params?.includeCitation).not.toEqual(true)
    expect(typeof result.params?.includeCitation).toEqual('string')
  })
})
