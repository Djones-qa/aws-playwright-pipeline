const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const client = new S3Client({ region: process.env.AWS_REGION });
const bucket = process.env.AWS_S3_BUCKET;
const reportDir = path.join(process.cwd(), "playwright-report");

async function uploadFile(filePath) {
  const key = "playwright-report/" + path.relative(reportDir, filePath).replace(/\\/g, "/");
  const body = fs.readFileSync(filePath);
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }));
  console.log(`Uploaded: ${key}`);
}

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((f) => {
    const full = path.join(dir, f);
    return fs.statSync(full).isDirectory() ? getFiles(full) : [full];
  });
}

(async () => {
  const files = getFiles(reportDir);
  if (!files.length) { console.log("No report files found."); return; }
  await Promise.all(files.map(uploadFile));
  console.log("Upload complete.");
})();
