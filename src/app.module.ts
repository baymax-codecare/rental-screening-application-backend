import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PublicFileModule } from './public-file/public-file.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { RentalApplicationModule } from './rental-application/rental-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),

    PublicFileModule,

    RentalApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SendgridService],
})
export class AppModule {}
