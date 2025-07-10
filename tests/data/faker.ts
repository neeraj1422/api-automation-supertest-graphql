import { faker } from '@faker-js/faker';

export const createRandomPost = () => {
    const title = faker.lorem.sentence();
    const body = faker.lorem.paragraphs(2);
    return { title, body };
};

