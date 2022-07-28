import {getRandomId} from '../utils/get-random-id'
import type {Item} from './complete-zotero-item'

export interface CitationNote {
  index: number
  citation: string
  citation_id: string
}

export interface LocatorInfo {
  label?: LocatorLabel
  locator?: string
  prefix?: string
  suffix?: string
}

export type LocatorLabel = 'page' | 'book' | 'chapter' | 'column' | 'figure' | 'folio' | 'issue' | 'line' | 'note' | 'opus' | 'paragraph' | 'part' | 'section' | 'sub verbo' | 'volume' | 'verse'

export class CitationInputItem {
  id: string
  uris: string
  itemData: Item
  locator?: string
  label: LocatorLabel = 'page'
  prefix?: string
  suffix?: string

  constructor(item: Item, locator?: LocatorInfo) {
    this.id = item.id
    // this.itemData =  Zotero.Cite.System.prototype.retrieveItem(item.id);
    this.itemData = item
    this.uris = getRandomId()
    if (locator) {
      this.locator = locator.locator ?? undefined
      this.label = locator.label ?? 'page'
      this.prefix = locator.prefix ?? undefined
      this.suffix = locator.suffix ?? undefined
    }
  }
}

export class CitationProcessItem {
  citationID = getRandomId()
  citationItems: CitationInputItem[] = []
  properties: {
    noteIndex: number
  }

  constructor(citationItems: CitationInputItem[], properties: {
    noteIndex: number
  }) {
    this.citationItems = citationItems
    this.properties = properties
  }
}

export interface CitationProcessInfo {
  bibchange: boolean
  citation_errors: string[]
}
