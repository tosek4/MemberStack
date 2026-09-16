import { BindingKey } from "@loopback/core";
import { MemberService } from "./service";

export const MEMBER_SERVICE = BindingKey.create<MemberService>('service.member')