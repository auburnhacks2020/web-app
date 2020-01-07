"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Application",
    embedded: false
  },
  {
    name: "SponsorData",
    embedded: false
  },
  {
    name: "ROLE",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://10.4.15.111:4466/database-service/production`,
  secret: `auburnhacks-prisma`
});
exports.prisma = new exports.Prisma();
