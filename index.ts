import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Export the name of the bucket
export const bucketName = bucket.id;
Add this shell script to make it easier 
git init
git add .
git commit -m "Adding pulumi program"
git remote add origin git@github.com:danfhernandez/my-unique-template.git
git push -u origin master
                
