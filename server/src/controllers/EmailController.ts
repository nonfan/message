import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Code } from "../entity/Code";
import { CustomError } from "../utils/error";
import { sendMail } from "../utils/emailServe";
import { mailValidator } from "../utils/validate";

export class EmailController {
  private codeRepository = AppDataSource.getRepository(Code);

  async getCode(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;

      console.log(email);

      if (!email || !mailValidator(email)) {
        return next(new CustomError("参数异常", 400));
      }

      // 随机六位数验证码
      const verificationCode = randowCode(6);

      let code = await this.codeRepository.findOneBy({ email });

      if (code) {
        await this.codeRepository.delete({ email });
      }

      const codeEneity = new Code();
      codeEneity.email = email;
      codeEneity.code = verificationCode;

      await this.codeRepository.save(codeEneity);

      sendMail(email, verificationCode);

      // 5分钟验证码过期
      handleInvalidCode(100, this.codeRepository, email);

      res.send({
        statusCode: 200,
        message: "发送成功",
      });
    } catch (e) {
      next(e);
    }
  }
}

async function handleInvalidCode(time: number, repository: any, email: string) {
  setTimeout(async () => {
    const code = await repository.findOneBy({ email });
    const diff = new Date().valueOf() - new Date(code.createdDate).valueOf();
    if (diff >= 1000 * 60 * time) {
      await repository.delete({ email });
    }
  }, 1000 * 61 * time);
}

function randowCode(length: number): string {
  return Math.random().toFixed(length).slice(-length);
}
