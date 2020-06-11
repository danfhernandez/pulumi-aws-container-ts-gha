import { ExampleEcsWebApp } from "./component";

const webApp = new ExampleEcsWebApp("my-app");

export const bucketName = webApp.bucketName;
export const url = webApp.url;
