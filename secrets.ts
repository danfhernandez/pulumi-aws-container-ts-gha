import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const username = new random.RandomString("my-string", {
	length: 16,
	special: true,
});


const usernameSecret = new random.RandomString("my-secret-string", {
	length: 16,
	special: true,
}, {
	// RandomString has an output of 'result' where the string actually is stored
	additionalSecretOutputs: ["result"]
});


export const notSecret = username.result;
export const secret = usernameSecret.result;
