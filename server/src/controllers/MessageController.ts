import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

export class MessageController {
  private messageRepository = AppDataSource.getRepository(Message);
  private userRepository = AppDataSource.getRepository(User);


  async saveMessage(content: any) {
    const message = new Message()
    message.message = content.message;
    message.userId = content.userId;
    await this.messageRepository.insert(message)
  }

  async getMessageList(req: Request, res: Response) {
    // 给 id 查自己的消息
    // 不给id 查最近的20条信息
    const { page = 0, size = 20 } = req.query;

    const list = await this.messageRepository.findAndCount({
      order: {
        createdDate: 'DESC'
      },
      skip: Number(page) * Number(size),
      take: Number(size)
    })

    const newList = await Promise.all(list[0].map(async item => {
      const user = await this.userRepository.findOneBy({ id: item.userId })

      return {
        userId: user.id,
        message: item.message,
        username: user.username,
        avatar: user.avatar,
      }
    }))

    res.send({
      message: "获取成功",
      data: newList.reverse(),
    })
  }
}