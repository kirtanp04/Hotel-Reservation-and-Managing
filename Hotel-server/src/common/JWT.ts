import jwt from 'jsonwebtoken';
import { SecrtKey } from '../env';
import { Crypt } from './Crypt';
import { ProjectResponse, errorPath } from './Response';


export class Jwt {
    private static JWT_KEY = SecrtKey.JWT_KEY!;

    static SignJwt = (data: any, expireIn?: string | number): ProjectResponse => {
        let _res = new ProjectResponse();

        try {
            const objEncrypt = Crypt.Encryption(data);

            if (objEncrypt.error === '') {
                const getToken = jwt.sign(
                    {
                        data: objEncrypt.data,
                    },
                    this.JWT_KEY,
                    {
                        expiresIn: expireIn || '1h',
                        //  algorithm: 'RS256'
                    }
                );

                if (getToken) {
                    _res.data = getToken;
                } else {
                    _res.error = 'Server Error not able to generate token';
                }
            } else {
                _res.error = errorPath('common/JWT', 'SignJwt', 33) + objEncrypt.error;
            }
        } catch (error) {
            _res.error = errorPath('common/JWT', 'SignJwt', 36) + error;
        } finally {
            return _res;
        }
    };

    static VerifyJwt = (token: string): ProjectResponse => {
        let _res = new ProjectResponse();

        try {
            const decodedToken: any = jwt.verify(token, this.JWT_KEY);
            if (decodedToken) {
                const objDecrypt = Crypt.Decryption(decodedToken.data);

                if (objDecrypt.error === '') {
                    _res.data = objDecrypt.data;
                } else {
                    _res.error = errorPath('common/JWT', 'VerifyJwt', 54) + objDecrypt.error;
                }
            } else {
                _res.error = errorPath('common/JWT', 'VerifyJwt', 57) + 'Not able to Decode Token, Might bo Wrong Token/key Provided.';
            }
        } catch (error) {
            _res.error = errorPath('common/JWT', 'VerifyJwt', 60) + error;
        } finally {
            return _res;
        }
    };
}
