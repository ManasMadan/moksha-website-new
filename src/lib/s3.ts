import { Client } from "minio";
import { randomUUID } from "crypto";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "443"),
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
  region: process.env.MINIO_REGION || "",
});

const BUCKET_NAME = "eventregistrations";

async function ensureBucketExists() {
  try {
    console.log("Checking if bucket exists...");
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    console.log(`Bucket exists: NOOOO IT DOESTTT :  ${exists}`);

    if (!exists) {
      console.log("Bucket does not exist. Creating bucket...");
      await minioClient.makeBucket(
        BUCKET_NAME,
        process.env.MINIO_REGION || "us-east-1"
      );
      console.log("Bucket created successfully.");
    } else {
      console.log("Bucket already exists.");
    }
  } catch (error) {
    console.error("Error in ensureBucketExists:", error);
    throw error;
  }
}

export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    console.log("Starting file upload process...");

    await ensureBucketExists();

    const fileExtension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    const objectName = `${path}/${fileName}`;
    console.log(`Generated object name: ${objectName}`);

    console.log("Converting file to buffer...");
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer.");

    console.log("Uploading file to MinIO...");
    await minioClient.putObject(
      BUCKET_NAME,
      objectName,
      fileBuffer,
      fileBuffer.length,
      {
        "Content-Type": file.type,
      }
    );
    console.log("File uploaded successfully.");

    console.log("Generating presigned URL...");
    const fileUrl = await minioClient.presignedGetObject(
      BUCKET_NAME,
      objectName,
      24 * 60 * 60
    );
    console.log(`Presigned URL generated: ${fileUrl}`);

    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading file to MinIO:", {
        message: error.message,
        stack: error.stack,
        details: error,
      });
    } else {
      console.error("Unknown error uploading file to MinIO:", error);
    }
    throw new Error("Failed to upload file");
  }
}