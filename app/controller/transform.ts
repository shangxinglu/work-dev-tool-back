import { Controller } from 'egg';
import { fromatResult } from '../../utils/tool';

export default class TransformController extends Controller {
    public async zhToEn() {
        const { ctx } = this;
        // ctx.body = await ctx.service.test.sayHi('egg');


        const { text } = ctx.request.body;

        const res = await ctx.service.translate.cnToEn(text)
        ctx.body = fromatResult(res)
    }
}
