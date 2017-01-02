"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const resolvers_1 = require("../../src/neo4j/resolvers");
const mock_db_builder_1 = require("../utils/mock-db-builder");
const db_1 = require("../../src/neo4j/db");
const chai = require("chai");
chai.should();
const expect = chai.expect;
const mocha_typescript_1 = require("mocha-typescript");
let GetNodeByIdTests = class GetNodeByIdTests {
    static before(done) {
        console.log('      Initialising MockDB');
        db_1.default.run({ statements: mock_db_builder_1.query })
            .then((result) => {
            console.log('      Initialised MockDB');
            done();
        })
            .catch((err) => { console.log(err); });
    }
    static after(done) {
        db_1.default.run({ statements: mock_db_builder_1.wipeQuery })
            .then((result) => {
            console.log('      Wiped MockDB');
            done();
        })
            .catch((err) => { console.log(err); });
    }
    async 'It should return a given node'(done) {
        let node = await resolvers_1.getNodeById('aaa');
        const match = {
            id: 'aaa',
            name: 'John',
        };
        expect(node).to.deep.equal(match);
        done();
    }
};
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetNodeByIdTests.prototype, "It should return a given node", null);
GetNodeByIdTests = __decorate([
    mocha_typescript_1.suite,
    __metadata("design:paramtypes", [])
], GetNodeByIdTests);
//# sourceMappingURL=resolvers.spec.js.map