import { cloneElement, FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { queryString } from "../../utils/queryString";

type UnauthenticatedRouteProps = {
  children: ReactElement;
};

/**
 * Here we are checking to ensure that the user is not authenticated before we render the child components.
 * Example child components here would be Login and Signup.
 * And in the case where the user is authenticated, we use the Redirect component to simply send the user to the homepage.
 * Explore more: https://sst.dev/chapters/create-a-route-that-redirects.html
 */

const UnauthenticatedRoute: FC<UnauthenticatedRouteProps> = (
  props
): ReactElement => {
  const { authorized } = useAppSelector((state) => state.events.auth);
  const { children } = props;
  const redirect = queryString("redirect");

  if (authorized) {
    return <Navigate to={redirect || "/"} />;
  }

  return cloneElement(children, props);
};

export default UnauthenticatedRoute;
