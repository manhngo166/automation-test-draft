import { test, expect, request } from '@playwright/test';
import auth from '~/pages/api/auth';
import project from '~/pages/api/project';
import { StaticVariables } from '~/helpers/staticVariables';
import task from '~/pages/api/task';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
test.describe('Admin - Project test', () => {
    test.beforeAll('admin login', async () => {
      const newLogin = await request.newContext();
      await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
      token = auth.token;
      userId = auth.userid;
      await newLogin.dispose();
    });
    let createdProjectId: string;
    test.beforeEach('Create Project data to test', async ({}, testInfo) => {
        if (testInfo.title === 'Create project') {
            console.log('Skip setup for Create project test case');
            return;
        }
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
        const newUpdateProject = await request.newContext();
        let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
        expect(updateProjectResponse).toHaveProperty('data');
        expect(updateProjectResponse.data.id).toBe(createdProjectId);
        expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
        expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);
        await newUpdateProject.dispose();
    });

    test('Delete project', async() => {
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
        await newDeleteProject.dispose();
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

test.describe('Contributor - Project test', () => {
    test.beforeAll('Admin login', async () => {
      const newLogin = await request.newContext();
      await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
      token = auth.token;
      userId = auth.userid;
      await newLogin.dispose();
    });
    let createdProjectId: string;
    test.beforeEach('Create Project data to test', async ({}, testInfo) => {
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        createdProjectId = await createProjectResponse.data.id;
        await newCreateProject.dispose();
    })

    test('Contributor - Get project by Id', async() => {
        const newLogin = await request.newContext();
        await auth.login(newLogin, StaticVariables.emailContributor, StaticVariables.passwordContributor);
        token = auth.token;
        userId = auth.userid;
        await newLogin.dispose();
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId)
        expect(getProjectById.data.id).toBe(createdProjectId);
    });
})

test.describe('Manager - Project test', () => {
    test.beforeAll('Manager login', async () => {
      const newLogin = await request.newContext();
      await auth.login(newLogin, StaticVariables.emailManager, StaticVariables.passwordManager);
      token = auth.token;
      userId = auth.userid;
      await newLogin.dispose();
    });
    let createdProjectId: string;
    test.beforeEach('Create Project data to test', async ({}, testInfo) => {
        if (testInfo.title === 'Manager - Create project') {
            console.log('Skip setup for Create project test case');
            return;
        }
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        createdProjectId = await createProjectResponse.data.id;
        await newCreateProject.dispose();
    })
    test.afterEach('Delete created Project data', async ({}, testInfo) => {
        if(testInfo.title === 'Manager - Delete project' || testInfo.title === 'Manager - Create project') {
            console.log('Skip cleanup data Delete project test case');
            return;
        }
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
        await newDeleteProject.dispose();
    })

    test('Manager - Get all projects', async() => {
        const newGetAllProject = await request.newContext();
        let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
        expect(getAllProjectResponse).toHaveProperty('data');
        await newGetAllProject.dispose();
    });

    test('Manager - Create project', async() => {
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        expect(createProjectResponse).toHaveProperty('data');
        await newCreateProject.dispose();
    });

    test('Manager - Update project', async() => {
        const newUpdateProject = await request.newContext();
        let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
        expect(updateProjectResponse).toHaveProperty('data');
        expect(updateProjectResponse.data.id).toBe(createdProjectId);
        expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
        expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);
        await newUpdateProject.dispose();
    });

    test('Manager - Delete project', async() => {
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
        await newDeleteProject.dispose();
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId)
        expect(getProjectById.data).not.toHaveProperty('name');
    });

    test('Manager - Get project by Id', async() => {
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId)
        expect(getProjectById.data.id).toBe(createdProjectId);
    });
})