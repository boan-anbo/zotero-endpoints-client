import { describe, expect, it } from 'vitest'
import { RequestData } from '../src/types/request-data'
import { paramBuilder } from '../src/utils/params_builder'
import { paramsParser } from '../src/utils/params-parser'

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

describe('Params builder and parser', () => {
  it('params builder should work', () => {
    const params = paramBuilder({
      booleanValue: false,
      numberValue: 0,
      arrayValue: [1, 2, 3],
      undefinedValue: undefined,
      nullValue: null,
      emptyStringValue: '',
    })
    expect(params.booleanValue).toEqual('false')
    expect(params.numberValue).toEqual('0')
    expect(params.arrayValue).toEqual('1,2,3')
    expect(params.undefinedValue).toBeUndefined()
    expect(params.nullValue).toBeUndefined()
    expect(params.emptyStringValue).toBeUndefined()
  })

  it('params parser should work', () => {
    const params = {
      booleanFalseValue: false,
      booleanTrueValue: true,
      numberValue: 0,
      arrayNumberValue: [1, 2, 3],
      arrayNumberStringValue: ['1', '2', '3'],
      arrayStringValue: ['string1', 'string2', 'string3'],
      arrayBooleanValue: [true, false, true],
      arrayUndefinedValue: [undefined, undefined, undefined],
      arrayNullValue: [null, null, null],
      undefinedValue: undefined,
      nullValue: null,
      uris: 'http://zotero.org/users/local/fpHSPtiX/items/ZXB4FUWZ',
      emptyStringValue: '',
    }
    const paramsBuilt = paramBuilder(params)
    const paramsParsed = paramsParser(paramsBuilt)
    expect(paramsParsed.booleanFalseValue).toEqual(false)
    expect(paramsParsed.booleanTrueValue).toEqual(true)
    expect(paramsParsed.numberValue).toEqual(0)
    expect(paramsParsed.arrayNumberValue).toEqual([1, 2, 3])
    expect(paramsParsed.arrayNumberStringValue).toEqual([1, 2, 3])
    expect(paramsParsed.arrayStringValue).toEqual(['string1', 'string2', 'string3'])
    expect(paramsParsed.arrayBooleanValue).toEqual([true, false, true])
    expect(paramsParsed.arrayUndefinedValue).toEqual([undefined, undefined, undefined])
    expect(paramsParsed.arrayNullValue).toEqual([null, null, null])
    expect(paramsParsed.undefinedValue).toBeUndefined()
    expect(paramsParsed.nullValue).toBeUndefined()
    expect(paramsParsed.uris).toEqual(['http://zotero.org/users/local/fpHSPtiX/items/ZXB4FUWZ'])
    expect(paramsParsed.emptyStringValue).toBeUndefined()

  })
})
