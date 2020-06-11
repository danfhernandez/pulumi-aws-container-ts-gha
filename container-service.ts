import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "public-read-write"
});

// A loadbalancer
const lb = new awsx.lb.ApplicationListener("nginx", { port: 80 });

// Load-balanced ecs fargate service
const nginx = new awsx.ecs.FargateService("nginx", {
    taskDefinitionArgs: {
        container: {
            image: "amazon/amazon-ecs-sample",
            portMappings: [ lb ]
            // Could add env var with s3 url
        },
    },
    desiredCount: 2,
});

// Export the name of the bucket and hostname of our service
export const bucketName = bucket.id;
export const url = lb.endpoint.hostname;
                
