import { describe, expect, it } from 'vitest'
import { ZoteroEndpointsClient } from '../src'

describe('collection functions should work', () => {
  it('should be able to add items to collection', async () => {
    const client = new ZoteroEndpointsClient()

    const uris = [
      'http://zotero.org/users/local/fpHSPtiX/items/ZXB4FUWZ',
      'http://zotero.org/users/local/fpHSPtiX/items/VANMI2PA',
    ]

    const response = await client.addItemToCollectionByUri(uris)
    expect(response.code).toEqual(200)

    // expect request with empty uris to throw
    await expect(client.addItemToCollectionByUri([])).rejects.toThrow()
  })
})
