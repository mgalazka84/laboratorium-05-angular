import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { DemoSession, DEMO_SESSION_KEY } from './demo-session';

describe('DemoSession persistence', () => {
  beforeEach(() => localStorage.removeItem(DEMO_SESSION_KEY));
  afterEach(() => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    localStorage.removeItem('lab07.other-data');
  });
  it('starts inactive with no stored session', () => {
    expect(new DemoSession().isActive()).toBe(false);
  });
  it('persists login and restores it in a fresh service instance', () => {
    const session = new DemoSession();
    session.login();
    expect(session.isActive()).toBe(true);
    expect(new DemoSession().isActive()).toBe(true);
  });
  it('does not accept an arbitrary stored value', () => {
    localStorage.setItem(DEMO_SESSION_KEY, 'false');
    expect(new DemoSession().isActive()).toBe(false);
  });
  it('logout removes only its own key and stays inactive after restart', () => {
    localStorage.setItem('lab07.other-data', 'keep');
    const session = new DemoSession();
    session.login(); session.logout();
    expect(session.isActive()).toBe(false);
    expect(new DemoSession().isActive()).toBe(false);
    expect(localStorage.getItem('lab07.other-data')).toBe('keep');
  });
});
