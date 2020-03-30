exports.resolvers = {
    Query: {
        allCharacters: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(
                    q.Map(
                        q.Paginate(q.Match(q.Index('allCharacters')), {
                            size: 256
                        }),
                    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
                    )
                )
                .then(result => result.data);
        },
        characterById: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(q.Get(q.Match(q.Index('characterById'), args._id)))
                .then(result => result.data);
        },
        characterByName: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(q.Get(q.Match(q.Index('characterByName'), args.name)))
                .then(result => result.data);
        }
    },
    Mutation: {
        createCharacter: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(
                    q.Create(q.Collection('Characters'), {
                        data: {
                            _id: args.id,
                            name: args.name,
                            house: args.house,
                            patronus: args.patronus,
                            bloodStatus: args.blood,
                            role: args.role,
                            school: args.school,
                            deathEater: args.deathEater,
                            dumbledoresArmy: args.dumbledoresArmy,
                            orderOfThePheonix: args.orderOfThePheonix,
                            ministryOfMagic: args.ministryOfMagic,
                            alias: args.alias,
                            wand: args.wand,
                            boggart: args.boggart,
                            animagus: args.animagus
                        }
                    })
                )
                .then(result => result.data);
        },
        updateCharacter: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(
                    q.Update(
                        q.Select(['ref'], q.Get(q.Match(q.Index(characterById), args._id))),
                        {
                            data: {
                                name: args.name,
                                house: args.house,
                                patronus: args.patronus,
                                bloodStatus: args.blood,
                                role: args.role,
                                school: args.school,
                                deathEater: args.deathEater,
                                dumbledoresArmy: args.dumbledoresArmy,
                                orderOfThePheonix: args.orderOfThePheonix,
                                ministryOfMagic: args.ministryOfMagic,
                                alias: args.alias,
                                wand: args.wand,
                                boggart: args.boggart,
                                animagus: args.animagus
                            }
                        }
                    )
                )
                .then(result => result.data)
        },
        deleteCharacter: (obj, args, context) => {
            const { client, query: q } = context;
            return client
                .query(
                    q.Delete(
                        q.Select(['ref'], q.Get(q.Match(q.Index('characterById'), args._id)))
                    )
                )
                .then(result => result.data);
        }
    }
}