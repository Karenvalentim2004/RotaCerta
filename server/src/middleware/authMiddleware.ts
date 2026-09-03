import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error(
        "JWT_SECRET não configurado no .env"
    );
}

const JWT_SECRET_STRING: string = JWT_SECRET;

export interface AuthenticatedRequest
    extends Request {
    usuarioId?: number;
}

export function authMiddleware(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) {
    try {
        const authorization =
            request.headers.authorization;

        if (!authorization) {
            return response.status(401).json({
                error:
                    "Token de autenticação não informado.",
            });
        }

        const parts =
            authorization.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {
            return response.status(401).json({
                error:
                    "Formato do token inválido.",
            });
        }

        const token = parts[1];

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET_STRING
            ) as {
                usuarioId: number;
                email: string;
            };

        request.usuarioId =
            Number(decoded.usuarioId);

        next();

    } catch (error) {
        console.error(
            "❌ Token inválido:",
            error
        );

        return response.status(401).json({
            error:
                "Token inválido ou expirado.",
        });
    }
}