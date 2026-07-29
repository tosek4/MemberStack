import { inject } from "@loopback/core";
import { CasbinEnforcer } from "./casbin.enforcer";

export class RolesService {
  constructor(
    @inject('casbin.enforcer')
    private casbinEnforcer: CasbinEnforcer,
  ) {}

  getEnforcer() {
    return this.casbinEnforcer.getEnforcer()
  }
}
