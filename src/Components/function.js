function makeData(length) {
  return new Array(length).fill(0).map((_, index) => ({
    id: index + 1,
    text: `Random Text `
  }));
}

export const data = makeData(20000);

export function findUser(data, filter) {
  return data.find(
    (user) => user.email === filter.email && user.password === filter.password
  );
}
