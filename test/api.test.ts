import { describe, expect, it } from 'vitest'
import { ZoteroEndpointsClient } from '../dist'

describe('Zotero endpoints should function', async () => {
  it('should be able to choose whether to include citations', async () => {
    const client = new ZoteroEndpointsClient()
    const conditions = [
      { field: 'citationKey', operator: 'is', query: 'vaghelaInterruptingMeritSubverting2022' },
    ]
    /**
       * Test default includeCitation to false
       */
    const result = await client.searchItems(conditions)
    expect(result.payload.length).toEqual(1)
    expect(result.payload[0].citation).toEqual(undefined)
    /**
       * Test with includeCitation: true
       */
    const resultWithCitation = await client.searchItems(conditions, undefined, { includeCitation: true })
    expect(resultWithCitation.payload.length).toEqual(1)
    expect(resultWithCitation.payload[0].citation).not.toEqual(undefined)
    /**
       * Test with includeCitation: false
       */
    const resultWithoutCitation = await client.searchItems(conditions, undefined, { includeCitation: false })
    expect(resultWithoutCitation.payload.length).toEqual(1)
    expect(resultWithoutCitation.payload[0].citation).toEqual(undefined)
  })
})
