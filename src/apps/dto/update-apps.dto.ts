import { PartialType } from "@nestjs/mapped-types"
import CreateAppsDto from "./create-apps.dto"

export default class UpdateAppDto extends PartialType(CreateAppsDto) { }
