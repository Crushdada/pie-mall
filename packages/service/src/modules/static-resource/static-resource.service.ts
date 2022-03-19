import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticResourceService {
  /**
   * 
   * @param file 
   * @param path 
   * @param fileName 
   * @returns Static Resource Path
   */
  storageService(
    file: Express.Multer.File,
    path: string,
    fileName: string,
  ): string {
    console.log("get you")
    //  const staticSrvDir = process.env.SSD; // 静态服务存储目录
    // const serviceRort = process.env.PIEMALL_SERVICE_PORT;
    // const avatarFileName = `${userId}.jpg`;
    // /**
    //  * project-path\dist\service\public\upload\user-avatar
    //  */
    // const avatarStorePath = join(
    //   __dirname,
    //   '../../../',
    //   staticSrvDir,
    //   '/user-avatar',
    // );
    // return this._responseSrv.tryExecute(async () => {
    //   // 创建静态资源存储服务路径(文件夹)
    //   if (!existsSync(avatarStorePath))
    //     mkdirSync(avatarStorePath, { recursive: true }); // 递归参数，否则只能建一层
    //   // 存储图片到静态服务目录
    //   writeFileSync(join(avatarStorePath, avatarFileName), file.buffer);
    //   // 写入图片存储路径到DB(userProfile)
    //   const _userRepo = {
    //     [process.env.PIEMALL_APP]: '_appUserRepo',
    //     [process.env.PIEMALL_ADMIN]: '_adminRepo',
    //   }[client];
    //   const userAvatarUrl = `http://localhost:${serviceRort}/user-avatar/${avatarFileName}`;
    //   await this[_userRepo].update(userId, {
    //     avatar: userAvatarUrl,
    //   });
    return 'H World!';
  }
}
