import { config } from 'dotenv';
import { join } from 'path';
config();

const environment = process.env.ENV;
let endpoint: string = '';
if (!environment) throw new Error('please pass the environment variable. Options: | dev | stage | st |');

config({ path: join(process.cwd(), 'tests', 'env', `${environment}.env`) });

if (environment === 'dev') {
    endpoint = '/api';
} else if (environment === 'stage' || environment === 'st') {
    endpoint = '/graphql';
}
console.log(environment, process.env.BASEURL, endpoint);
export const ENV = {
    BASEURL: process.env.BASEURL,
    ENDPOINT: endpoint
};