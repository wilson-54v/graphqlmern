const {projects,clients} = require('../sampleData.js');
// Mongoose model

const Project = require('../models/Project.js')
const Client = require('../models/Client.js')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      client : {
        type:ClientType,
        resolve(parent,args) {
            return clients.findById(parent.clientId)
        }
      }
    }),
  }); 

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});


const RootQuery = new GraphQLObjectType({
    name:'RootQuertType',
    fields : {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent,args) {
               Project.find();
            },
        },
        project: {
          type:ProjectType  ,
          args: {id: {type:GraphQLID}},
          resolve(parent,args) {
            return Project.findById(args.id)
          }

        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent,args) {
                return Client.find();
            },
        },
        client: {
          type:ClientType  ,
          args: {id: {type:GraphQLID}},
          resolve(parent,args) {
            return Client.findById(args.id);
          }
        }
    }
});
module.exports = new GraphQLSchema({
    query :RootQuery
})