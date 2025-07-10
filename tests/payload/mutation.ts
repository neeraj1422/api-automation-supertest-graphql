export const generateCreatePostMutation = (title: string, body: string) => {
    return `
    mutation {
      createPost(input: {
        title: "${title}",
        body: "${body}",
      }) {
        id
        title
        body
      }
    }
  `;
};
export const updatePost = (id: number, body: string) => {
    return `
    mutation (
    $id: ID!,
    $input: UpdatePostInput!
) {
  updatePost(id: $id, input: $input) {
    id
    body
  }
}`;
};
