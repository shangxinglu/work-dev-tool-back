import { Service } from 'egg';
import { md5 } from '../../utils/tool';
import * as qs from 'qs';

export default class Translate extends Service {
    public async cnToEn(text: string) {
        const res = await this.translate(text, 'zh', 'en');
        return res;

    }

    public async translate(text: string, from: string, to: string) {
        const { app, config } = this;
        const { appid } = config.baidu;
        const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
        const salt = Date.now();
        const sign = this.getSign(text, salt)

        const res = await app.curl(url, {
            method: 'POST',
            // method: 'GET',
            headers: {
                "content-type": 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: qs.stringify({
                q: encodeURI(text),
                from,
                to,
                appid,
                salt,
                sign
            }, {
                encode: false
            }),
            beforeRequest(data) {
                console.log('beforeRequest', data.path);
            }
        });

        const resData = res.data;
        if (resData.error_code) {
            console.warn(resData)
        }
        const [data] = resData.trans_result;

        return data.dst;


    }



    public getSign(query: string, salt: number): string {
        const { config } = this;
        const { appid, secretKey } = config.baidu;
        const str = appid + query + salt + secretKey;
        const sign = md5(str);

        return sign
    }
}


