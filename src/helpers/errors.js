export const parseErrors = (errors) =>
  errors?.inner?.reduce(
    (prev, error) => ({
      ...prev,
      [error.path]: error.message,
    }),
    {},
  );
