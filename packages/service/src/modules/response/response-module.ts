import { Global, Module } from "@nestjs/common";
import { ResponseService } from './response-service';
import { ErrorService } from './error/err-service';



@Global()
@Module({
    providers: [ResponseService, ErrorService],
    exports: [ResponseService, ErrorService],
})
export class ResponseModule { }