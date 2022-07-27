import { expect, it } from 'vitest'
import { RequestData } from '../src/types/request-data'

it('should stringify params for http client', () => {
  const unstringifiedParams = {
    booleanValue: false,
    numberValue: 0,
  }
  expect(typeof unstringifiedParams.booleanValue).not.toEqual('string')
  const stringifiesParams = RequestData.stringifyParams(unstringifiedParams)
  expect(typeof stringifiesParams).not.toBeNull()
  expect(typeof stringifiesParams?.booleanValue).toEqual('string')
  expect(stringifiesParams?.booleanValue).toEqual('false')
  expect(typeof stringifiesParams?.numberValue).toEqual('string')
  expect(stringifiesParams?.numberValue).toEqual('0')
})
