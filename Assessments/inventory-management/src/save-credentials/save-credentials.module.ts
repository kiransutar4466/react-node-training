import { Logger, Module } from "@nestjs/common";
import { SaveCredentialsService } from "./save-credentials.service";

@Module({
  providers: [SaveCredentialsService, Logger],
  exports: [SaveCredentialsService],
})
export class SaveCredentialsModule {}
