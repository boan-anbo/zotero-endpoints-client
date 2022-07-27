import { describe, expect, it } from 'vitest'
import { ZoteroEndpointsClient } from '../src/zotero-endpoints-client'

describe('should be able to search', async () => {
  it('should search by conditions with or without citations', async () => {
    // One result without citation
    const client = new ZoteroEndpointsClient()
    const conditions = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    const resultOne = await client.searchItems(conditions)
    expect(resultOne.payload.length).toEqual(1)
    expect(resultOne.payload[0].citation).toEqual(undefined)
    // One result with citation
    const conditionsWithIncludeCitation = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    const params = { includeCitation: true }
    const resultTwo = await client.searchItems(conditionsWithIncludeCitation, undefined, params)
    expect(resultTwo.payload.length).toEqual(1)
    expect(resultTwo.payload[0].citation).not.undefined
    // No result
    const conditionsWithNoResults = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2021' },
    ]
    const resultThree = await client.searchItems(conditionsWithNoResults)
    expect(resultThree.payload.length).toEqual(0)
    // two conditions ANY
    const conditionsWithOr = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
      { field: 'citationKey', operator: 'is', query: 'burrellSocietyAlgorithms2021' },
    ]
    const resultFour = await client.searchItems(conditionsWithOr, 'ANY', params)
    expect(resultFour.payload.length).toEqual(2)
    // two conditions ALL
    const conditionsWithAnd = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
      { field: 'citationKey', operator: 'is', query: 'burrellSocietyAlgorithms2021' },
    ]
    const resultFive = await client.searchItems(conditionsWithAnd, 'ALL', params)
    expect(resultFive.payload.length).toEqual(0)
  })
})
