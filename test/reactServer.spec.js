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
const reactServer_1 = require("../src/reactServer");
const chai = require("chai");
const sinon = require("sinon");
const http = require("http");
chai.should();
const expect = chai.expect;
const mocha_typescript_1 = require("mocha-typescript");
let ReactServerTests = ReactServerTests_1 = class ReactServerTests {
    static before() {
        console.log('    Before the Tests\n      Mount the Server');
        this.serverCallback = sinon.spy();
        this.ReactServer = new reactServer_1.default(2000, this.serverCallback);
    }
    'It should return a server object.'() {
        expect(ReactServerTests_1.ReactServer).to.be.an.instanceof(reactServer_1.default);
    }
    'It should call the server callback.'() {
        ReactServerTests_1.serverCallback.should.have.been.called;
    }
    'It should be listening on the designated port.'(done) {
        http.get('http://localhost:2000', (res) => {
            expect(res).to.exist;
            done();
        });
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReactServerTests.prototype, "It should return a server object.", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReactServerTests.prototype, "It should call the server callback.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReactServerTests.prototype, "It should be listening on the designated port.", null);
ReactServerTests = ReactServerTests_1 = __decorate([
    mocha_typescript_1.suite
], ReactServerTests);
var ReactServerTests_1;
//# sourceMappingURL=reactServer.spec.js.map