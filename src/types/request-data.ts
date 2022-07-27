export class RequestData<T> {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  params: Record<string, string> | null
  payload: T | null

  constructor(url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', params: Record<string, any> | null, payload: T | null) {
    this.url = url
    this.method = method
    this.params = RequestData.stringifyParams(params)
    // convert http params to string or joined string array.
    this.payload = payload
  }

  static Post<T>(url: string, params: Record<string, any> | null, payload: T | null): RequestData<T> {
    return new RequestData(url, 'POST', params, payload)
  }

  static Get<T>(url: string, params: Record<string, any> | null): RequestData<T> {
    return new RequestData<T>(url, 'GET', params, null)
  }

  /**
   * Some http clients requires the params or query info to be stringified.
   * @param params: params to be stringified.
   */
  static stringifyParams(params: Record<string, any> | null): Record<string, string> | null {
    let result: Record<string, string> | null = {}
    if (params) {
      result = Object.entries(params).reduce((acc: Record<string, any>, [key, value]) => {
        if ((value !== null && value !== undefined) && (typeof value !== 'string'))
          acc[key] = value.toString()
        else if (Array.isArray(value))
          acc[key] = value.map(value => value.toString()).join(',')
        else
          acc[key] = value
        return acc
      }, {})
    }
    else {
      result = null
    }
    return result
  }
}
