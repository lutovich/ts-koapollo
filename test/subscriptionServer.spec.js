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
const http = require("http");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
chai.should();
const expect = chai.expect;
const assert = chai.assert;
const mocha_typescript_1 = require("mocha-typescript");
let SubscriptionServerTests = SubscriptionServerTests_1 = class SubscriptionServerTests {
    static before() {
        console.log('    Before the Tests\n      Mount the Server');
        this.serverCallback = sinon.spy();
        this.subscriptionManager = mock_schema_1.subscriptionManager;
        this.subServer = new subscriptionServer_1.default(8080, this.subscriptionManager, this.serverCallback);
    }
    'It should return a server object.'() {
        expect(SubscriptionServerTests_1.subServer).to.be.an.instanceof(subscriptionServer_1.default);
    }
    'It should call the server callback.'() {
        SubscriptionServerTests_1.serverCallback.should.have.been.called;
    }
    'It should 404 an index page.'(done) {
        http.get('http://localhost:8080/', (res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    }
    'It should publish subscriptions.'(done) {
        const client = new subscriptions_transport_ws_1.Client('ws://localhost:8080/');
        setTimeout(() => {
            client.subscribe({
                query: 'subscription postInfo($id: Int) { post(id: $id) { id, title } }',
                operationName: 'postInfo',
                variables: { id: 3 },
            }, (error, result) => {
                if (error) {
                    console.log(error);
                    done(error);
                }
                if (result) {
                    expect(result).to.haveOwnProperty('post');
                    expect(result.post.id).to.equal(3);
                    expect(result.post.title).to.equal('three');
                    done();
                }
            });
        }, 100);
        setTimeout(() => {
            SubscriptionServerTests_1.subscriptionManager.publish('post', { id: 3 });
        }, 200);
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
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SubscriptionServerTests.prototype, "It should 404 an index page.", null);
__decorate([
    mocha_typescript_1.test, mocha_typescript_1.timeout(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SubscriptionServerTests.prototype, "It should publish subscriptions.", null);
SubscriptionServerTests = SubscriptionServerTests_1 = __decorate([
    mocha_typescript_1.suite,
    __metadata("design:paramtypes", [])
], SubscriptionServerTests);
var SubscriptionServerTests_1;
//# sourceMappingURL=subscriptionServer.spec.js.map