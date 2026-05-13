"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_helper_1 = require("./test-helper");
const node_test_1 = require("node:test");
(0, node_test_1.describe)('HomePage', () => {
    let app;
    let client;
    (0, node_test_1.before)(async () => {
        ;
        ({ app, client } = await (0, test_helper_1.setupApplication)());
    });
    (0, node_test_1.after)(async () => {
        await app.stop();
    });
    (0, node_test_1.it)('exposes a default home page', async () => {
        await client
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/);
    });
    (0, node_test_1.it)('exposes self-hosted explorer', async () => {
        await client
            .get('/explorer/')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(/<title>LoopBack API Explorer/);
    });
});
//# sourceMappingURL=home-page.acceptance.js.map