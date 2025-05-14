import { User } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            user?: User
            files?: Express.Multer.File[];
        }

        namespace Multer {
            export interface File {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                destination: string;
                filename: string;
                path: string;
                buffer: Buffer;
            }
        }
    }
}
