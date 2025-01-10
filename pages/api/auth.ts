import { expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { StaticVariables } from '~/helpers/staticVariables';

class auth{
    public token: string;
    public userid: string;
    async login(
        request: APIRequestContext,
        email: string, 
        password: string) {
        const newLogin = await request.post(StaticVariables.apiURL + '/api/auth/login', {
                data: {
                    email: email,
                    password: password,
                }
            });
        expect(newLogin.status()).toBe(201);
        let responseBody = await newLogin.json();
        expect(responseBody.data).toHaveProperty('token');
        this.token = responseBody.data.token;
        this.userid = responseBody.data.user.id;
    }
    async register(
        request: APIRequestContext) {
        const newRegister = await request.post(StaticVariables.apiURL + '/api/auth/register', {
            data: {
                email: 'Auto_email_' + Date.now() + '@autotestmail.com',
                username: 'Auto User Name',
                password: '12345678',
            }
        });
        expect(newRegister.status()).toBe(201);
        let responseBody = await newRegister.json();
        return responseBody;
    }
    async resetPassword(
        request: APIRequestContext) {
        const newResetPassword = await request.post(StaticVariables.apiURL + '/api/auth/reset-password', {
            data: {
                email: 'Auto_email_' + Date.now() + '@vmotester.com',
                newPassword: '12345678a',
            }
        });
        expect(newResetPassword.status()).toBe(201);
        let responseBody = await newResetPassword.json();
        return responseBody;
    }
    async changeEmail(
        request: APIRequestContext) {
        const newChangeEmail = await request.post(StaticVariables.apiURL + '/api/auth/change-email', {
            data: {
                email: 'Auto_email_' + Date.now() + '@vmotester.com',
                password: '12345678',
            }
        });
        expect(newChangeEmail.status()).toBe(201);
        let responseBody = await newChangeEmail.json();
        return responseBody;
    }
}
export default new auth();
