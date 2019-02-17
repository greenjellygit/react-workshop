import SearchContainer from "../containers/search.container";
import AuthConatiner from "../containers/auth.conatiner";

export const rootRoutes = [
  {
    component: AuthConatiner,
    path: '/',
    exact: true,
  },
  {
    component: SearchContainer,
    path: '/search',
    exact: true,
  },
];
