export type WarnOnceHandler = (message: string, type?: 'warn' | 'error') => void;

export function warnOnce(componentName: string): WarnOnceHandler {
  const didWarn: { [msg: string]: boolean } = {};

  return (message: string, type: 'warn' | 'error' = 'warn') => {
    if (!didWarn[message]) {
      console[type](`[@vkontakte/icons][${componentName}] ${message}`);
      didWarn[message] = true;
    }
  };
}
