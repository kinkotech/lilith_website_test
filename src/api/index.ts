import axios from "@/utils/request";
import { ModelTaskRequestData, Login } from "./types/interface";

export default {
    /**
     * 获取训练任务列表
     * @param params 
     * @returns 
     */
    getModelTaskList: (params: ModelTaskRequestData) => axios.get('/api/aigc/model-task', { params }),
    /**
     * 登录mock
     */
    login: (params: Login ) => axios.get('/api/aigc/login', { params }),
    /**
     * 获取access_token（有效期7200秒，开发者必须在自己的服务全局缓存access_token）
     */
    getWxAccessToken: (params: any ) => axios.get('https://api.weixin.qq.com/cgi-bin/token', { params }),
    /**
     * 获得jsapi_ticket
     */
    getWxJsapiTicket: (params: any ) => axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', { params }),
}