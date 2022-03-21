import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StaticResourceService {
  /**
   *
   * @param file
   * @param path 以/开头，即静态资源根目录
   * @param fileName 带后缀名
   * @returns Static Resource Path
   */
  storageService(
    file: Express.Multer.File,
    path: string,
    fileName: string,
  ): string {
    const staticSrvDir = process.env.SSD; // 静态服务存储目录
    const serviceRort = process.env.PIEMALL_SERVICE_PORT;
    // 文件资源访问路径
    const resourceUrl = `http://localhost:${serviceRort}${path}/${fileName}`;
    /**
     * project-path\dist\service\public\upload\path
     */
    const avatarStorePath = join(__dirname, '../../../', staticSrvDir, path);
    try {
      // 创建静态资源存储服务路径(文件夹)
      if (!existsSync(avatarStorePath))
        mkdirSync(avatarStorePath, { recursive: true }); // 递归参数，否则只能建一层
      // 存储静态资源到静态服务目录
      writeFileSync(join(avatarStorePath, fileName), file.buffer);
    } catch (err) {
      console.log(err);
      throw Error('🙈资源存储失败');
    }
    return resourceUrl;
  }
}
