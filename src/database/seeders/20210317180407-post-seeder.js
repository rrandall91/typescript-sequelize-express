/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require("faker");
const slugify = require("slugify");

const tableName = "posts";

const post1 = faker.random.words(Math.floor(Math.random() * Math.floor(12)));
const post2 = faker.random.words(Math.floor(Math.random() * Math.floor(12)));
const post3 = faker.random.words(Math.floor(Math.random() * Math.floor(12)));

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(tableName, [
      {
        user_id: 1,
        title: post1,
        slug: slugify(post1),
        body: faker.lorem.paragraph(),
      },
      {
        user_id: 2,
        title: post2,
        slug: slugify(post2),
        body: faker.lorem.paragraph(),
      },
      {
        user_id: 3,
        title: post3,
        slug: slugify(post3),
        body: faker.lorem.paragraph(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
