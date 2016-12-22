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
const subscriptionServer_1 = require("../src/subscriptionServer");
const mock_schema_1 = require("./utils/mock-schema");
const chai = require("chai");
const sinon = require("sinon");
chai.should();
const expect = chai.expect;
const mocha_typescript_1 = require("mocha-typescript");
let SubscriptionServerTests = SubscriptionServerTests_1 = class SubscriptionServerTests {
    static before() {
        console.log('    Before the Tests\n      Mount the Server');
        this.serverCallback = sinon.spy();
        this.subServer = new subscriptionServer_1.default(8080, mock_schema_1.default, { mockCall: () => { return true; } }, this.serverCallback);
    }
    'It should return a server object.'() {
        expect(SubscriptionServerTests_1.subServer).to.be.an.instanceof(subscriptionServer_1.default);
    }
    'It should call the server callback.'() {
        SubscriptionServerTests_1.serverCallback.should.have.been.called;
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionServerTests.prototype, "It should return a server object.", null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionServerTests.prototype, "It should call the server callback.", null);
SubscriptionServerTests = SubscriptionServerTests_1 = __decorate([
    mocha_typescript_1.suite
], SubscriptionServerTests);
var SubscriptionServerTests_1;
//# sourceMappingURL=subscriptionServer.spec.js.map