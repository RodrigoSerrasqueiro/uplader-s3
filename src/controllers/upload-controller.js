import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/aws.js";
import fs from "node:fs";
import { env } from "../config/env.js";

const uploadFileToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${file.originalname}`;
    return { success: true, data, fileUrl };
  } catch (err) {
    console.error("Erro ao fazer upload:", err);
    return { success: false, error: err };
  }
};

export { uploadFileToS3 };
