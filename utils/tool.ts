import * as Crypto from 'crypto'

export const md5 = (str: string) => {
    return Crypto.createHash('md5').update(str).digest('hex')
}

export const fromatResult = (data: any, code: number = 200) => {
    return {
        code,
        data
    }
}