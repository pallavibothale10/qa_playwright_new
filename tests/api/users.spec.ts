import { test, expect } from '@playwright/test';
import { ApiRoutes } from '../../utils/apiRoutes';

const newUser = {
  name: 'morpheus',
  job: 'leader'
};

test.describe('Reqres Users API', () => {
  test('GET /api/users?page=2 returns a list of users', async ({
    request
  }) => {
    const response = await request.get(ApiRoutes.users, {
      params: { page: 2 }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    for (const user of body.data) {
      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String)
        })
      );
    }
  });

  test('POST /api/users creates a user', async ({ request }) => {
    const response = await request.post(ApiRoutes.users, {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        ...newUser,
        id: expect.any(String),
        createdAt: expect.any(String)
      })
    );
    expect(Number.isNaN(Date.parse(body.createdAt))).toBe(false);
  });

  // reqres does not persist data, so a GET of the new user would 404.
  // This shows the create-then-verify structure: create, capture the id,
  // then use it in a follow-up request and assert on that response.
  test('created user can be updated using the returned id', async ({
    request
  }) => {
    const userId = await test.step('create user', async () => {
      const response = await request.post(ApiRoutes.users, {
        data: newUser
      });
      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.id).toBeTruthy();
      return body.id as string;
    });

    await test.step('update the created user by id', async () => {
      const updatedJob = 'zion resident';
      const response = await request.put(ApiRoutes.user(userId), {
        data: { ...newUser, job: updatedJob }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.job).toBe(updatedJob);
      expect(body.updatedAt).toBeTruthy();
    });
  });
});
