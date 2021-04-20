import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository()
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository };