import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class DBService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: [{ emit: 'event', level: 'query' }] });

    //
    // This is to ensure undefined accidently update, delete
    //
    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.action === 'deleteMany' || params.action === 'updateMany') {
        //Check the Where clause in params.arg.where, if it's empty just return
        if (!isNotEmptyObject(params.args.where)) {
          return;
        }
      }
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
