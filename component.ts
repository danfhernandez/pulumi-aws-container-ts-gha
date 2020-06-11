import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx"
import { ComponentResource } from "@pulumi/pulumi";
import { ComponentResourceOptions } from "@pulumi/pulumi"
import { Output } from "@pulumi/pulumi"

export class ExampleEcsWebApp extends ComponentResource {
    
    readonly bucketName: Output<string>;
    readonly url: Output<string>;

    constructor(name: string, opts?: ComponentResourceOptions) {
        
        const type = 'company:package:ExampleEcsWebApp'; 
        super(type, name, opts);
        
        let bucket = new aws.s3.Bucket(`${name}-bucket`, {}, { parent: this });

        // A loadbalancer
        const lb = new awsx.lb.ApplicationListener(`${name}-nginx`, { port: 80 }, { parent: this });

        // Load-balanced ecs fargate service
        const nginx = new awsx.ecs.FargateService(`${name}-nginx`, {
            taskDefinitionArgs: {
                container: {
                    image: "amazon/amazon-ecs-sample",
                    portMappings: [ lb ]
                    // Add in env var for S3 and then a secret eventually.
                },
            },
            desiredCount: 2,
        }, { parent: this });

        this.bucketName = bucket.id;
        this.url = lb.endpoint.hostname;
        
        this.registerOutputs({
            bucketName: this.bucketName, 
            url: this.url
        });
    }
}
