export const formValidators = {
  // required field
  required() {
    return function (input: string) {
      return !(input.trim().length === 0);
    };
  },
};
