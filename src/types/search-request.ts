import type { SearchCondition } from './search-condition'


export type JoinMode = 'ANY' | 'ALL'

export interface SearchRequest {
  conditions: SearchCondition[]
  joinMode?: 'ANY' | 'ALL'
}
