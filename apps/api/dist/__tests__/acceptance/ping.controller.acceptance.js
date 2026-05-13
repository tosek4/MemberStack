"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const test_helper_1 = require("./test-helper");
const node_test_1 = require("node:test");
(0, node_test_1.describe)('PingController', () => {
    let app;
    let client;
    (0, node_test_1.before)(async () => {
        ;
        ({ app, client } = await (0, test_helper_1.setupApplication)());
    });
    (0, node_test_1.after)(async () => {
        await app.stop();
    });
    (0, node_test_1.it)('invokes GET /ping', async () => {
        const res = await client.get('/ping?msg=world').expect(200);
        (0, testlab_1.expect)(res.body).to.containEql({ greeting: 'Hello from LoopBack' });
    });
});
//# sourceMappingURL=ping.controller.acceptance.js.map