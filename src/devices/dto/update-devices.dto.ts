import { PartialType } from "@nestjs/mapped-types";
import CreateDeviceDto from "./create-devices.dto";

export default class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
