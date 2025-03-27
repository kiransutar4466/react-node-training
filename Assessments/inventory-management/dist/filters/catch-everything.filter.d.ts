import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class CatchEverythingFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost, logger: Logger);
    catch(exception: any, host: ArgumentsHost): void;
}
