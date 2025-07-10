import { expect } from 'chai';
import { config } from 'dotenv';
import { mutateGraphQl, queryGraphQl, queryGraphQlAllPosts } from 'helper/apiUtils';
import { generateCreatePostMutation, updatePost } from 'payload/mutation';
import { queryAllPosts, queryPost } from 'payload/queries';
config();

//const TOKEN = process.env.Token


describe('test graphql sample', () => {
    it('should create a post', async () => {
        const title = 'Sample Post Title';
        const body = 'Sample post body content.';
        // const title = String(faker.lorem.sentence());
        // const body = String(faker.lorem.paragraphs(2));
        const response = await mutateGraphQl(generateCreatePostMutation(title, body));
        expect(response.statusCode).equal(200);
        expect(response.body.data).not.undefined;
    });
    it('should get the post', async () => {
        const response = await queryGraphQl(queryPost);
        expect(response.statusCode).equal(200);
        const responseData = response.body.data;
        expect(responseData).not.undefined;
        console.log(responseData.post);
    });
    it('should get all posts based on variable', async () => {
        const variables = {
            options: {
                paginate: {
                    page: 1,
                    limit: 5
                }
            }
        };
        const response = await queryGraphQlAllPosts(queryAllPosts, variables);
        expect(response.statusCode).equal(200);
        const responseData = response.body.data;
        expect(responseData).not.undefined;
        console.log(responseData.posts.data);
    });
    it('should update a post based on id', async () => {
        const title = 'Sample Post Title';
        const body = 'updated post body content.';
        // const title = String(faker.lorem.sentence());
        // const body = String(faker.lorem.paragraphs(2));
        const response = await mutateGraphQl(updatePost(1, body));
        expect(response.statusCode).equal(200);
        const responseData = response.body.data;
        expect(responseData).not.undefined;
        expect(responseData.updatePost.post.id).equal(1);
        expect(response.body.data).not.undefined;
        console.log(responseData.post);
    });

});





