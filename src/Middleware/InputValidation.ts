import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
export function dtoValidationMiddleware(
    type: any,
    skipMissingProperties = false,
): RequestHandler {
    return (req, res, next) => {
        const dtoObj = plainToClass(type, req.body);
        validate(dtoObj, { skipMissingProperties }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const dtoErrors = errors.map((error: ValidationError) =>
                        (Object as any).values(error.constraints),
                    );
                    res.status(403).json(dtoErrors);
                } else {
                    req.body = dtoObj
                    next();
                }
            },
        );
    };
}
