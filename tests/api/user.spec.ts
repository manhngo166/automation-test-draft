import { test, expect, request } from '@playwright/test';
import auth from '~/pages/api/auth';
import project from '~/pages/api/project';
import { StaticVariables } from '~/helpers/staticVariables';
import task from '~/pages/api/task';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
// test.beforeAll('user login', async () => {
//   const newLogin = await request.newContext();
//   await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
//   token = auth.token;
//   userId = auth.userid;
//   await newLogin.dispose();
// });
test.describe('User test', () => {
    // let createdTaskId: string;
    // test.beforeEach('Create Task data to test', async ({}, testInfo) => {
    //     if (testInfo.title === 'Create task') {
    //         console.log('Skip setup for Create tast test case');
    //         return;
    //     }
    //     // Create a task
    //     const newCreateTask = await request.newContext();
    //     let getCreateTaskResponse = await task.createTask(newCreateTask, token);
    //     createdTaskId = getCreateTaskResponse.data.id;
    // })
    // test.afterEach('Delete created Task data', async ({}, testInfo) => {
    //     if(testInfo.title === 'Delete task' || testInfo.title === 'Create task') {
    //         console.log('Skip cleanup data Delete tast test case');
    //         return;
    //     }
    //     // Delete created task
    //     const newDeleteTask = await request.newContext();
    //     let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId); 
    //     await newDeleteTask.dispose();
    // })

    test('User register', async () => {
        const newRegister = await request.newContext();
        let registerResponse = await auth.register(newRegister); 
        expect(registerResponse).toHaveProperty('data');
        await newRegister.dispose();
    });

    // test('Create task', async () => {
    //     const newCreateTask = await request.newContext();
    //     let getCreateTaskResponse = await task.createTask(newCreateTask, token);
    //     expect(getCreateTaskResponse.data).toHaveProperty('title');
    //     expect(getCreateTaskResponse.data.title).toContain('Task Auto_');        
    //     await newCreateTask.dispose();
    // });

    // test('Update task', async () => {
    //     // Update task
    //     const newUpdateTask = await request.newContext();
    //     let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    //     expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    //     expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    //     expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    //     await newUpdateTask.dispose();
    // });

    // test('Get a task by ID', async () => {
    //     // Get deleted task
    //     const newGetTask = await request.newContext();
    //     let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId); 
    //     expect(getTaskResponse.data.id).toBe(createdTaskId);
    //     await newGetTask.dispose();
    // });

    // test('Delete task', async () => {
    //     // Delete created task
    //     const newDeleteTask = await request.newContext();
    //     let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId); 
    //     await newDeleteTask.dispose();
    //     // Get deleted task
    //     const newGetTask = await request.newContext();
    //     let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId); 
    //     expect(getTaskResponse.data).not.toHaveProperty('id');
    //     await newGetTask.dispose();
    // });


});