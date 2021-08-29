import AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
});

const uploadFile = (file: File) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log(reader.result);
    const fileContent = reader.result as string;

    console.log(process.env.REACT_APP_bucketName);

    const params = {
      Bucket: process.env.REACT_APP_bucketName as string,
      Key: "bar.jpg",
      Body: fileContent,
      ACL: "public-read",
    };

    try {
      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          throw err;
        }
        alert("画像のアップロードに成功しました!");
      });
    } catch (err) {
      alert(err);
    }
  };
};

export default uploadFile;
