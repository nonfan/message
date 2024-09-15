import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { AppDataSource } from '../data-source';
import { Code } from '../entity/Code';
import { User } from '../entity/User';
import { CustomError } from '../utils/error';
const jwt = require('jsonwebtoken');

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private codeRepository = AppDataSource.getRepository(Code);

  async getList(req: Request, res: Response, next: NextFunction) {
    const users: Array<any> = await this.userRepository.find();

    res.send({
      statusCode: 200,
      users,
    });
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!id) {
      throw new CustomError('参数异常', 400);
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new CustomError('用户不存在', 404);
    }

    res.send({
      statusCode: 200,
      user,
    });
  }

  async login(req: Request, res: Response) {
    // todo 带修改
    const { email, code } = req.body;

    if (!email || !code) {
      throw new CustomError('参数异常', 400);
    }

    let user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      // 没有用户，就直接创建一个
      user = new User()
      user.email = email;
      await this.userRepository.insert(user);
    }

    const codeRecorder = await this.codeRepository.findOneBy({ email });

    if (!codeRecorder) {
      throw new CustomError('验证码失效了，请重新获取', 400);
    }

    if (codeRecorder.code !== code) {
      throw new CustomError('验证码错误', 400);
    }

    const token = jwt.sign({ ...user }, config.secretKey);

    return res.send({
      statusCode: 200,
      message: '登录成功',
      token: 'Bearer ' + token,
      user,
    });
  }

  async remove(req: Request, res: Response) {
    const id: any = req.params.id;

    const user = await this.userRepository.delete({ id });

    if (!user.affected) {
      throw new CustomError('用户不存在', 400);
    }

    res.send({
      statusCode: 200,
      message: '已删除',
    });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { email, username, avatar, wallpaper } = req.body;

    if (!id) {
      throw new CustomError('参数异常', 400);
    }

    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new CustomError('用户不存在', 404);
    }

    if (email && user.email !== email) {
      const result = await this.userRepository.findOneBy({
        email,
      });

      if (result) {
        throw new CustomError('需要的修改邮箱，已存在', 409);
      }

      user.email = email;
    }

    if (username) user.username = username;

    if (avatar) user.avatar = avatar;

    if (wallpaper) user.wallpaper = wallpaper;

    const newUser = await this.userRepository.save(user);

    res.send({
      statusCode: 204,
      message: '更新成功',
      user: newUser,
    });
  }
}
