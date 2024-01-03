import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Request, Response } from 'express';
import { join } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        res.redirect("https://petinuniverse.com")
    }
}