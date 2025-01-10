import { test, expect, request } from '@playwright/test';
import auth from '~/pages/api/auth';
import project from '~/pages/api/project';
import { StaticVariables } from '~/helpers/staticVariables';
import task from '~/pages/api/task';
import { title } from 'process';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
test.beforeAll('admin login', async () => {
  const newLogin = await request.newContext();
  await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
  token = auth.token;
  userId = auth.userid;
  await newLogin.dispose();
});
test.describe('Admin - Task test', () => {
    let createdTaskId: string;
    test.beforeEach('Create Task data to test', async ({}, testInfo) => {
        if (testInfo.title === 'Create task') {
            console.log('Skip setup for Create tast test case');
            return;
        }
        // Create a task
        const newCreateTask = await request.newContext();
        let getCreateTaskResponse = await task.createTask(newCreateTask, token);
        createdTaskId = getCreateTaskResponse.data.id;
    })
    test.afterEach('Delete created Task data', async ({}, testInfo) => {
        if(testInfo.title === 'Delete task' || testInfo.title === 'Create task') {
            console.log('Skip cleanup data Delete tast test case');
            return;
        }
        // Delete created task
        const newDeleteTask = await request.newContext();
        let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId); 
        await newDeleteTask.dispose();
    })

    test('Get all task', async () => {
        const newGetAllTask = await request.newContext();
        let getAllTaskResponse = await task.getAllTask(newGetAllTask, token); 
        expect(getAllTaskResponse).toHaveProperty('data');
        await newGetAllTask.dispose();
    });
    test('Create task', async () => {
        const newCreateTask = await request.newContext();
        let getCreateTaskResponse = await task.createTask(newCreateTask, token);
        expect(getCreateTaskResponse.data).toHaveProperty('title');
        expect(getCreateTaskResponse.data.title).toContain('Task Auto_');        
        await newCreateTask.dispose();
    });

    test('Update task', async () => {
        // Update task
        const newUpdateTask = await request.newContext();
        let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
        expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
        expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
        expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
        await newUpdateTask.dispose();
    });

    test('Get a task by ID', async () => {
        // Get deleted task
        const newGetTask = await request.newContext();
        let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId); 
        expect(getTaskResponse.data.id).toBe(createdTaskId);
        await newGetTask.dispose();
    });

    test('Delete task', async () => {
        // Delete created task
        const newDeleteTask = await request.newContext();
        let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId); 
        await newDeleteTask.dispose();
        // Get deleted task
        const newGetTask = await request.newContext();
        let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId); 
        expect(getTaskResponse.data).not.toHaveProperty('id');
        await newGetTask.dispose();
    });


});

test.describe('Admin - Project test', () => {
    let createdProjectId: string;
    test.beforeEach('Create Project data to test', async ({}, testInfo) => {
        if (testInfo.title === 'Create project') {
            console.log('Skip setup for Create project test case');
            return;
        }
        // Create a project
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        createdProjectId = await createProjectResponse.data.id;
        await newCreateProject.dispose();
    })
    test.afterEach('Delete created Project data', async ({}, testInfo) => {
        if(testInfo.title === 'Delete project' || testInfo.title === 'Create project') {
            console.log('Skip cleanup data Delete project test case');
            return;
        }
        //Delete project
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
        await newDeleteProject.dispose();
    })

    test('Get all projects', async() => {
        const newGetAllProject = await request.newContext();
        let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
        expect(getAllProjectResponse).toHaveProperty('data');
        await newGetAllProject.dispose();
    });

    test('Create project', async() => {
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        expect(createProjectResponse).toHaveProperty('data');
        await newCreateProject.dispose();
    });

    test('Update project', async() => {
        // Update project
        const newUpdateProject = await request.newContext();
        let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
        expect(updateProjectResponse).toHaveProperty('data');
        expect(updateProjectResponse.data.id).toBe(createdProjectId);
        expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
        expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);
        await newUpdateProject.dispose();
    });

    test('Delete project', async() => {
        //Delete project
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
        await newDeleteProject.dispose();
        //Get deleted project to verify
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId)
        expect(getProjectById.data).not.toHaveProperty('name');
    });

    test('Get project by Id', async() => {
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId)
        expect(getProjectById.data.id).toBe(createdProjectId);
    });
})