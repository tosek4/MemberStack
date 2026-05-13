"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberstackApiApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const repositories_1 = require("./domains/role/repositories");
const repositories_2 = require("./domains/user/repositories");
const repositories_3 = require("./domains/attendance/repositories");
const repositories_4 = require("./domains/member/repositories");
const repositories_5 = require("./domains/member-plan/repositories");
const repositories_6 = require("./domains/member-subscription/repositories");
const repositories_7 = require("./domains/payment/repositories");
const repositories_8 = require("./domains/refresh-token/repositories");
const datasources_1 = require("./datasources");
class MemberstackApiApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.repository(repositories_3.AttendanceRepository);
        this.repository(repositories_4.MemberRepository);
        this.repository(repositories_5.MemberPlanRepository);
        this.repository(repositories_6.MemberSubscriptionRepository);
        this.repository(repositories_7.PaymentRepository);
        this.repository(repositories_8.RefreshTokenRepository);
        this.repository(repositories_1.RoleRepository);
        this.repository(repositories_2.UserRepository);
        //Database connection
        this.dataSource(datasources_1.PostgresDataSource, 'postgres');
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.MemberstackApiApplication = MemberstackApiApplication;
//# sourceMappingURL=application.js.map