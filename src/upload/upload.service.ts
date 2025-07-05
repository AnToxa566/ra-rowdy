import { Injectable } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';

import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private storage = new Storage({
    projectId: process.env.GC_PROJECT_ID,
    credentials: {
      private_key: process.env.GC_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.GC_CLIENT_EMAIL,
    },
  });

  private imageBucketName = 'rowdy-images';

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.imageBucketName);

    const cleanedName = file.originalname.replace(/\s+/g, '_');
    const safeFileName = `${uuid()}-${cleanedName}`;
    const blob = bucket.file(safeFileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('GCS upload error:', err);
        reject(err);
      });
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.imageBucketName}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }
}
