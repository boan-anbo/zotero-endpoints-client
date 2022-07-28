import { describe, expect, it } from 'vitest'
import { ZoteroEndpointsClient } from '../src'

describe('item operations should work', () => {
  it ('should select any item', async () => {
    const client = new ZoteroEndpointsClient()
    const result = await client.getSelectAnyItem()
    expect(result.code).toEqual(200)
  })
  it('should be able to get current selected Items', async () => {
    const client = new ZoteroEndpointsClient()
    const result = await client.getSelectedItems()
    expect(result.code).toEqual(200)
    expect(result.payload.length).toBeGreaterThan(0)
  })
})
