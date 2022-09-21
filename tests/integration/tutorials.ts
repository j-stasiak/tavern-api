import { CreateTutorialDto } from '../../src/modules/tutorials/dtos/create-tutorial';
import { TutorialStep } from '../../src/modules/tutorials/entities/tutorial-step';
import { User, UserRank } from '../../src/modules/user/entities';
import { TestManager } from '../helpers/test-manager';

describe('tutorials', () => {
  const testManager = new TestManager();
  let token: string;
  let user: User;

  const tutorialData: CreateTutorialDto = {
    title: 'Intermediate tutorial 1',
    description: 'This tutorial is for intermediate only',
    isActive: true,
    steps: [
      {
        title: 'Intermediate tutorial pt. 1',
        description: 'Do this',
        isActive: true,
        stepNumber: 1
      },
      {
        title: 'Intermediate tutorial pt. 2',
        description: 'Do that',
        isActive: true,
        stepNumber: 2
      }
    ]
  };

  beforeAll(async () => {
    await testManager.init();
    const loginData = await testManager.loginTestUser({ username: 'test', password: 'test', email: 'test@test.com' });
    token = loginData.jwt;
    user = loginData.user;
  });

  afterAll(async () => {
    await testManager.cleanDatabase();
    await testManager.close();
  });

  describe('POST /tutorial', () => {
    it('should create tutorial with steps', async () => {
      const result = await testManager.testApp
        .post('/tutorial')
        .send(tutorialData)
        .set('authorization', `Bearer ${token}`);

      expect(result.body.id).toBeDefined();
      expect(result.body.title).toEqual('Intermediate tutorial 1');
      expect(result.body.stepsAmount).toEqual(2);
    });
  });

  describe('PATCH /tutorial/:id', () => {
    afterEach(async () => {
      await testManager.cleanDatabase(['tutorial']);
    });

    it('should update tutorial title', async () => {
      const result = await testManager.testApp
        .post('/tutorial')
        .send(tutorialData)
        .set('authorization', `Bearer ${token}`);

      await testManager.testApp
        .patch(`/tutorial/${result.body.id}`)
        .send({ title: 'Beginner tutorial 1' })
        .set('authorization', `Bearer ${token}`);

      const resultAfterPatch = await testManager.testApp
        .get(`/tutorial/${result.body.id}`)
        .set('authorization', `Bearer ${token}`);

      expect(resultAfterPatch.body.id).toEqual(result.body.id);
      expect(resultAfterPatch.body.title).toEqual('Beginner tutorial 1');
      expect(resultAfterPatch.body.stepsAmount).toEqual(2);
    });
  });

  it('should update tutorial step title and tutorial title', async () => {
    const result = await testManager.testApp
      .post('/tutorial')
      .send(tutorialData)
      .set('authorization', `Bearer ${token}`);

    await testManager.testApp
      .patch(`/tutorial/${result.body.id}`)
      .send({
        title: 'Beginner tutorial 1',
        steps: [{ id: result.body.steps[0].id, title: 'Beginner tutorial pt. 1' }]
      })
      .set('authorization', `Bearer ${token}`);

    const resultAfterPatch = await testManager.testApp
      .get(`/tutorial/${result.body.id}`)
      .set('authorization', `Bearer ${token}`);

    expect(resultAfterPatch.body.id).toEqual(result.body.id);
    expect(resultAfterPatch.body.title).toEqual('Beginner tutorial 1');
    expect(resultAfterPatch.body.stepsAmount).toEqual(2);
    expect(resultAfterPatch.body.steps.find((step: TutorialStep) => step.id === result.body.steps[0].id).title).toEqual(
      'Beginner tutorial pt. 1'
    );
  });

  describe('POST /tutorial/:id/complete', () => {
    afterEach(async () => {
      await testManager.cleanDatabase(['tutorial']);
    });

    it('should complete whole tutorial', async () => {
      const result = await testManager.testApp
        .post('/tutorial')
        .send(tutorialData)
        .set('authorization', `Bearer ${token}`);

      await testManager.testApp
        .post(`/tutorial/${result.body.id}/complete`)
        .send({ title: 'Beginner tutorial 1' })
        .set('authorization', `Bearer ${token}`);

      const userResult = await testManager.testApp.get(`/user/${user.id}`).set('authorization', `Bearer ${token}`);

      console.log(userResult.body);

      expect(userResult.body.info.level).toEqual(2);
      expect(userResult.body.info.experience).toEqual(0);
      expect(userResult.body.info.rank).toEqual(UserRank.AMATEUR);
    });
  });
});
