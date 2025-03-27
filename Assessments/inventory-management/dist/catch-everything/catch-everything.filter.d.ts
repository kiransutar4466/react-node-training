import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class CatchEverythingFilter<T> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost): void;
}
