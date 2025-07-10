
export const queryAllCountryNames =
    `query ExampleQuery {
    countries {
      name
    }
  }`;

export const queryCountryDetailsByCode = (code: string) => {
    return `query Query {
    country(code: "${code}") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}`;
};
export const queryPost =
    `query {
  post(id: 1) {
    id
    title
    body
  }
}`;
export const queryAllPosts =
    `query (
  $options: PageQueryOptions
) {
  posts(options: $options) {
    data {
      id
      title
    }
    meta {
      totalCount
    }
  }
}`;


