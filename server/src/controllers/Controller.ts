/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { getManager } from 'typeorm'
import { Message } from '../connection/entities/Message';
import { BadRequestError, NotFoundError } from '../util/errors';
import { Users } from '../connection/entities/Users';

class Controller {
  private static instance: Controller;
  private connection = connection;

  public static getInstance(): Controller {
      if (!Controller.instance) {
          Controller.instance = new Controller();
      }
      return Controller.instance;
  }

  public async Get(req: Request, res: Response, next: NextFunction) {
    
    try {
        const messageId = req.params.id;

        const message = await getManager()
        .getRepository(Message)
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.forUser', 'user')
        .where(`message.MessageID = ${ messageId }`)
        .getOne();
        if(!message){
            throw new NotFoundError(`Message with id: ${messageId} not exists.`);
        }

        res.json(message);
    } catch (error) {
        next(error);
    }
  }

  public async GetList(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { userId } = req.query;

        const messages = await getManager()
        .getRepository(Message)
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.forUser', 'user')
        .where(`message.ForUser = ${ userId }`)
        .getManyAndCount();

        res.json({ messages: messages[0], total: messages[1] });
    } catch (error) {
        next(error);
    }
  }

  public async Add(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { title, messageText, userId } = req.body;

        const userExists = await getManager().findOne(Users, userId);

        if(!userExists){
            throw new BadRequestError(`User with userId: ${userId} does not exists.`);
        }

        const message = new Message();
        message.message = messageText;
        message.title = title;
        message.forUserId = userId;

        await getManager().save(Message, message);

        res.json({
            code: 200, 
            messageId: message.messageId
        });

    } catch (error) {
        next(error);
    }
  }

  public async Delete(req: Request, res: Response, next: NextFunction) {
      try {
          const { messageId } = req.body;

          await getManager().delete(Message, {messageId: messageId});

          res.json({
              code: 200,
              message: 'Message deleted successfully'
          });
      } catch (error) {
          next(error);
      }
  }

  public async Edit(req: Request, res: Response, next: NextFunction) {
      try {
          const { messageText, title } = req.body;
          const messageId = req.params.id;
          
          const messageNew = await getManager().findOne(Message, messageId);
          
          if(!messageNew){
              throw new NotFoundError(`Message with id: ${messageId} not found`);
          }
        
          messageNew.message = messageText? messageText: messageNew.message;
          messageNew.title = title? title: messageNew.title;

          await getManager().save(Message, messageNew);

          res.json({
              code: 200,
              message: 'Message updated sucessfully'
          })
      } catch (error) {
          next(error);
      }
  }


}

export { Controller };
