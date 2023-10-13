import { DBService } from './../shared/db.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PublicFilesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly dbService: DBService,
  ) {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
    mimeType: string,
  ) {
    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get<string>('awsS3Storage.publicBucketName'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.dbService.publicFile.create({
      data: {
        key: uploadResult.Key,
        url: uploadResult.Location,
        mimeType: mimeType,
      },
    });

    return newFile;
  }
}
