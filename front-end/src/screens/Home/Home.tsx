import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/slices/auth";

const Home: FC = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async (): Promise<void> => {
    try {
      await Auth.signOut();

      dispatch(logOut());
      navigate("/auth");
      toast("Logged out");
    } catch (e) {
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Home;
