"use strict";
const apollo_client_1 = require("apollo-client");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (options) => new apollo_client_1.default(Object.assign({}, {
    dataIdFromObject: (result) => {
        if (result.id && result.__typename) {
            return result.__typename + result.id;
        }
        return null;
    },
}));
//# sourceMappingURL=create-apollo-client.js.map