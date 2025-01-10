import { test, expect, request, APIRequestContext } from '@playwright/test';
import { StaticVariables } from '../../helpers/staticVariables';

class user{
    async user(
        request: APIRequestContext, token: string) {
            const newGetAllUser = await request.get(StaticVariables.apiURL + '/api/users',{
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
        expect(newGetAllUser.status()).toBe(200);
        return newGetAllUser.json();
    }

    async getUserById(
        request: APIRequestContext, token: string, userId: string) {
            const newGetUserById = await request.get(StaticVariables.apiURL + '/api/users' + userId,{
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
        expect(newGetUserById.status()).toBe(200);
        return newGetUserById.json();
    }
    async assigRoleToUser(
        request: APIRequestContext, token: string, userId: string) {
            const newAssigRoleToUser = await request.patch(StaticVariables.apiURL + '/api/users' + userId + 'role',{
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`,
                },
            });
        expect(newAssigRoleToUser.status()).toBe(200);
        return newAssigRoleToUser.json();
    }
}
export default new user();