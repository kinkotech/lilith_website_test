import axios from "@/utils/request";
import { ModelTaskRequestData, Login, GetShare } from "./types/interface";

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
     * 获取APP_ID,nonceStr,timestamp,signature
     */
    getShare: (params: GetShare) => axios.get('https://wechatauth.kinkotec.cn/share/', { params })
}