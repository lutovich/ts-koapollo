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
const graphQLServer_1 = require("../src/graphQLServer");
const mock_schema_1 = require("./utils/mock-schema");
const chai = require("chai");
const sinon = require("sinon");
const http = require("http");
const XHR = require("xhr2");
chai.should();
const expect = chai.expect;
const mocha_typescript_1 = require("mocha-typescript");
let GraphQLServerTests = GraphQLServerTests_1 = class GraphQLServerTests {
    static before() {
        console.log('    Before the Tests\n      Mount the Server');
        this.serverCallback = sinon.spy();
        this.graphQLServer = new graphQLServer_1.default(3000, this.serverCallback, mock_schema_1.default);
    }
    'It should return a server object.'() {
        expect(GraphQLServerTests_1.graphQLServer).to.be.an.instanceof(graphQLServer_1.default);
    }
    'It should call the server callback.'() {
        GraphQLServerTests_1.serverCallback.should.have.been.called;
    }
    'It should be listening on the designated port.'(done) {
        http.get('http://localhost:3000', (res) => {
            expect(res).to.exist;
            done();
        });
    }
    'Index Route should be 404.'(done) {
        http.get('http://localhost:3000/', (res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    }
    'Responds to a basic query.'(done) {
        const xhr = new XHR();
        xhr.responseType = 'json';
        xhr.open('POST', 'http://localhost:3000/graphql');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onloadend = () => {
            expect(xhr.status).to.equal(200);
            done();
        };
        xhr.send(`{ "query": "{ posts {id, title} }" }`);
    }
    'Responds accurately to a basic query.'(done) {
        const xhr = new XHR();
        xhr.responseType = 'json';
        xhr.open('POST', 'http://localhost:3000/graphql');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onloadend = () => {
            const data = xhr.response.data;
            expect(xhr.response.data).to.equal(200);
            done();
        };
        xhr.send(`{ "query": "{ posts {id, title} }" }`);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "It should return a server object.", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "It should call the server callback.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "It should be listening on the designated port.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "Index Route should be 404.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "Responds to a basic query.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GraphQLServerTests.prototype, "Responds accurately to a basic query.", null);
GraphQLServerTests = GraphQLServerTests_1 = __decorate([
    mocha_typescript_1.suite,
    __metadata("design:paramtypes", [])
], GraphQLServerTests);
var GraphQLServerTests_1;
//# sourceMappingURL=graphQLServer.spec.js.map