import axios from "axios";
import { Request, Response } from "express";
import config from '../config';
import { AppDataSource } from "../data-source";
import { Feedback } from "../entity/Feedback";
import { CustomError } from "../utils/error";

const http = require('https')

export class CommonController {
  private feedbackRepository = AppDataSource.getRepository(Feedback);

  async getImage(req: Request, res: Response) {
    const image = await axios.get(config.imageApi);
    const base64 = await imageUrlToBase64(image.data.data)

    res.send({
      message: "请求图片成功",
      image: base64
    })
  }

  async feedback(req: Request, res: Response) {
    const id = req.params.id;
    const { description } = req.body;

    if (!description || !id) throw new CustomError('参数异常', 400)

    await this.feedbackRepository.insert({ userId: id, description })

    res.send({
      message: "反馈成功, 我们会加急处理"
    })
  }

  async getFeedbackList(req: Request, res: Response) {
    res.send({
      message: "获取反馈内容列表",
      data: []
    })
  }
}

function imageUrlToBase64(url: string) {
  return new Promise((resolve, reject) => {
    let req = http.get(url, (res) => {
      let chunks = [];
      let size = 0;

      res.on('data', (chunk) => {
        chunks.push(chunk);
        size += chunk.length
      })

      res.on('end', (err) => {
        const data = Buffer.concat(chunks, size);
        const imageBase64 = data.toString('base64url');

        resolve(imageBase64)
      })
    })

    req.on('error', (e) => {
      reject(e.message)
    })

    req.end()
  })
}