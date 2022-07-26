import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

type AuthenticatedRouteProps = {
  children: ReactElement;
};

/**
 * This simple component creates a Route where its children are rendered only if the user is authenticated.
 * If the user is not authenticated, then it redirects to the login page.
 * Explore more: https://sst.dev/chapters/create-a-route-that-redirects.html
 */

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
  children,
}): ReactElement => {
  const { pathname, search } = useLocation();
  const { authorized } = useAppSelector((state) => state.events.auth);

  if (!authorized) {
    return <Navigate to={`/auth?redirect=${pathname}${search}`} />;
  }

  return children;
};

export default AuthenticatedRoute;
