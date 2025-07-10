import { ENV } from 'env/manager';
import supertest from 'supertest';

export const queryGraphQl = async (graphQLQuery: string) => {
    try {
        const response = await supertest(ENV.BASEURL)
            .post(ENV.ENDPOINT)
            .send({ query: graphQLQuery });
        return response;
    } catch (error) {
        console.error(`Error making request to ${ENV.BASEURL + ENV.ENDPOINT}:`, error);
        throw error;
    }
};
export const queryGraphQlAllPosts = async (graphQLQuery: string, variables: Record<string, any>) => {
    try {
        const response = await supertest(ENV.BASEURL)
            .post(ENV.ENDPOINT)
            .send({ query: graphQLQuery, variables: variables });
        return response;
    } catch (error) {
        console.error(`Error making request to ${ENV.BASEURL + ENV.ENDPOINT}:`, error);
        throw error;
    }
};
export const mutateGraphQl = async (mutationPayload: string) => {
    try {
        const response = await supertest(ENV.BASEURL)
            .post(ENV.ENDPOINT)
            .send({ query: mutationPayload });
        return response;
    } catch (error) {
        console.error(`Error making request to ${ENV.BASEURL + ENV.ENDPOINT}:`, error);
        throw error;
    }
};