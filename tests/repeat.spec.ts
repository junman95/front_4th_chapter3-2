import { expect, test } from '@playwright/test';
test('repeat E2E', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-07-01T00:00:00Z'));
  await page.goto('http://localhost:5173');

  // ! 생성로직
  await page.getByRole('textbox', { name: '제목' }).click();
  await page.getByRole('textbox', { name: '제목' }).fill('');
  await page.getByRole('textbox', { name: '제목' }).press('CapsLock');
  await page.getByRole('textbox', { name: '제목' }).fill('주간팀 회의');
  await page.getByRole('textbox', { name: '날짜' }).fill('2024-07-01');
  await page.getByRole('textbox', { name: '시작 시간' }).click();
  await page.getByRole('textbox', { name: '시작 시간' }).press('ArrowUp');
  await page.getByRole('textbox', { name: '시작 시간' }).press('Tab');
  await page.getByRole('textbox', { name: '시작 시간' }).fill('10:00');
  await page.getByRole('textbox', { name: '종료 시간' }).click();
  await page.getByRole('textbox', { name: '종료 시간' }).press('ArrowUp');
  await page.getByRole('textbox', { name: '종료 시간' }).press('Tab');
  await page.getByRole('textbox', { name: '종료 시간' }).fill('11:00');
  await page.getByRole('textbox', { name: '설명' }).click();
  await page.getByRole('textbox', { name: '설명' }).fill('주간 업무 보고 및 계획 수립');
  await page.getByRole('textbox', { name: '위치' }).click();
  await page.getByRole('textbox', { name: '위치' }).fill('회의실 A');
  await page.locator('span').first().click();
  await page.getByLabel('반복 유형').selectOption('weekly');
  await page.getByRole('textbox', { name: '반복 종료일' }).fill('2024-07-31');
  await page.getByTestId('event-submit-button').click();

  const eventList = page.getByTestId('event-list');
  await expect(eventList).toContainText('주간팀 회의');
  // N 개의 이벤트가 생성되었는지 확인어떻게할까?

  // ! 수정로직
  await page.getByRole('button', { name: 'Edit event' }).first().click();
  await page.getByRole('textbox', { name: '제목' }).click();
  await page.getByRole('textbox', { name: '제목' }).fill('주간팀 회의 수정');
  await page.locator('label').filter({ hasText: '반복 일정' }).click();
  await page.getByRole('textbox', { name: '제목' }).click();
  await page.getByRole('textbox', { name: '제목' }).fill('수정 팀 회의');
  await page.getByTestId('event-submit-button').click();

  await expect(eventList).toContainText('수정 팀 회의');

  // ! 삭제로직
  await page.getByRole('button', { name: 'Delete event' }).first().click();
  await page.getByRole('button', { name: 'Delete event' }).first().click();
  await page.getByRole('button', { name: 'Delete event' }).first().click();
  await page.getByRole('button', { name: 'Delete event' }).first().click();
  await page.getByRole('button', { name: 'Delete event' }).first().click();

  // 다 지우고 나면 없어야 한다.
  await expect(eventList).not.toContainText('주간팀 회의');
});
