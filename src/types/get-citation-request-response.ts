import {CiteOptions} from './cite-options'
import type {CitationNote, LocatorInfo} from './get-citation'

export class GetCitationRequest {
  lines: GetCitationRequestEntry[][] = []
  options: CiteOptions = new CiteOptions()

  static fromJsonRequest(json: Partial<GetCitationRequest>): GetCitationRequest {
    const request = new GetCitationRequest()
    request.lines = json.lines?.map(line => line.map(entry => GetCitationRequestEntry.fromJson(entry))) ?? []
    request.options = CiteOptions.fromJson(json.options ?? new CiteOptions())

    if (request.lines.length === 0)
      throw new Error('No citation lines')

    return request
  }
}

export class GetCitationResponse {
  notes: CitationNote[] = []
  citeOptions: CiteOptions = new CiteOptions()
  bibliography = ''
}

export class GetCitationRequestEntry {
  citeKey: string | undefined = undefined
  locatorInfo?: LocatorInfo

  static fromJson(json: Partial<GetCitationRequestEntry>): GetCitationRequestEntry {
    const entry = new GetCitationRequestEntry()
    entry.citeKey = json.citeKey
    entry.locatorInfo = json.locatorInfo
    return entry
  }
}
