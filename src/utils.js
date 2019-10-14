export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const noOps = () => {};

export function getNewTodo(text) {
  return {
    id: getRandomInt(9999),
    text,
    isComplete: false,
    createdAt: Date.now()
  };
}
