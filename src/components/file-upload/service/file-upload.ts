// import request from './request';
const request = () => {};
/**
 * 文件上传信息响应
 */
export interface UploadKeyResponse {
  /** 文件名称 */
  name: string;
  /** 上传地址（host） */
  host: string;
  /** 文件访问 URL 前缀 */
  url: string;
}

/**
 * 七牛云上传响应
 */
export interface QiniuResp {
  /** 文件哈希 */
  hash: string;
  /** 文件key */
  key: string;
}

/**
 * 获取文件上传信息
 *
 * @returns 返回文件名、上传地址、访问 URL 前缀
 * @description 注意：此接口直接返回对象，不包装在 ApiResponse 中
 */
export const getUploadKey = async (): Promise<UploadKeyResponse> => {
  // 由于响应拦截器会返回 response.data，且此接口不包装 ApiResponse
  // TypeScript 类型需要断言处理
  const response = await request.get<UploadKeyResponse>('/api/fileStore/image');
  return response as unknown as UploadKeyResponse;
};

/**
 * 上传文件到七牛云
 *
 * @param file - 要上传的文件
 * @param uploadInfo - 上传信息（从 getUploadKey 获取）
 */
export const uploadToQiniu = async (
  file: File,
  uploadInfo: UploadKeyResponse
): Promise<QiniuResp> => {
  const formData = new FormData();
  formData.append('file', file);

  // 使用返回的 host 和 name 进行上传
  const response = await request.post<QiniuResp>(
    `${uploadInfo.host}?key=${encodeURIComponent(uploadInfo.name)}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response as unknown as QiniuResp;
};

/**
 * 构建文件访问 URL
 *
 * @param uploadInfo - 上传信息（从 getUploadKey 获取）
 * @param key - 文件 key（从 uploadToQiniu 返回）
 * @returns 可访问的文件 URL
 */
export const buildFileUrl = (
  uploadInfo: UploadKeyResponse,
  key: string
): string => {
  return `${uploadInfo.url}${encodeURIComponent(key)}`;
};
export const useImageUrl = () => {
  const ensureImageBaseUrl = () => {
    console.log(' ==>');
  };
  const resolveImageUrl = () => {
    console.log(' ==>');
  };
  return { ensureImageBaseUrl, resolveImageUrl };
};
