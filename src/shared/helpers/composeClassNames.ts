export const composeClassNames = (...args: unknown[]): string => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(composeClassNames(...arg));
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && (arg as Record<string, unknown>)[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.filter(Boolean).join(' ');
};
