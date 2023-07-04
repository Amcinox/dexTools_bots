export interface QueryObj {
    [key: string]: string | number | boolean | undefined
}

export function toQuery<T>(queryObj: T | any) {
    if (!queryObj || !Object.keys(queryObj).length) return ''
    const queries: string[] = []
    Object.keys(queryObj).forEach((key) => {
        if (queryObj[key]) {
            queries.push(`${key}=${queryObj[key]}`)
        }
    })
    return `?${queries.join('&')}`
}
