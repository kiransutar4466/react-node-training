/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { promises as fs } from "fs";
import * as path from "path";

@Injectable()
export class SaveCredentialsService {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(SaveCredentialsService.name);
  }
  private filePath = path.join(__dirname, "../../Credentials/passwords.json");

  async appendToJsonFile(newCredential: any) {
    try {
      const fileData = await fs.readFile(this.filePath, "utf8");
      const jsonArray = JSON.parse(fileData);
      jsonArray.push(newCredential);
      await fs.writeFile(this.filePath, JSON.stringify(jsonArray));

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Error appending to JSON file",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
