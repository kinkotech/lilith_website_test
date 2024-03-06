/**
 * 接口
 */
export interface IResponseType<P = Record<string, unknown>> {
	code: number
	msg: string
	data: P
}

export interface ModelTaskRequestData {
    // 页码
    page: number;
    // 每页条目数
    page_size: number;
    // 搜索内容，用于指定要搜索的关键字
    keyword: string;
    // 排序方式，可以是 'desc'（降序） 或 'asc'（升序）
    order: 'desc' | 'asc';
    // 排序字段，用于指定要根据哪个字段进行排序
    order_by: string;
    // 游戏ID，用于指定所属游戏的唯一标识符
    game_id: number;
}
