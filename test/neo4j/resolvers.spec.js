"use strict";
const resolvers_1 = require("../../src/neo4j/resolvers");
const mock_db_builder_1 = require("../utils/mock-db-builder");
const db_1 = require("../../src/neo4j/db");
const chai = require("chai");
const expect = chai.expect;
describe('GetNodeByIdTests', function () {
    before(function (done) {
        const session = db_1.default.session();
        console.log('      Initialising MockDB');
        session.run({ statements: mock_db_builder_1.query })
            .then((result) => {
            console.log('      Initialised MockDB');
            session.close();
            done();
        })
            .catch((err) => {
            console.log(err);
            session.close();
            done(err);
        });
    });
    after(function (done) {
        const session = db_1.default.session();
        session.run({ statements: mock_db_builder_1.wipeQuery })
            .then((result) => {
            console.log('      Wiped MockDB');
            session.close();
            done();
        })
            .catch((err) => {
            console.log(err);
            session.close();
            done(err);
        });
    });
    it('Should return a given node', async function () {
        let node = await resolvers_1.getNodeById('aaa');
        const match = {
            id: 'aaa',
            name: 'John',
        };
        return expect(node).to.deep.equal(match);
    });
});
//# sourceMappingURL=resolvers.spec.js.map