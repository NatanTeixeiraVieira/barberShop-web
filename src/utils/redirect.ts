export const redirectUser = (route: string, time: number) => {
  setTimeout(() => {
    window.location.href = route;
  }, time * 1000);
};
