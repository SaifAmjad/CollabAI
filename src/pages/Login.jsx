import { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../components/PrimaryBtn";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { postUser } from "../services/authenticate";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setVisible }) => {
  const navigate = useNavigate();
  const { setIsAuthenticad } = useContext(AuthContext);

  const location = useLocation();

  const [alertVisible, serAlertVisible] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);
  const [errorFlag,setErrorFlag]=useState(false);

  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitUser = async () => {
    setLoading(true);
    try {
      const response = await postUser(user);
    
      const userData = response.data;
      if (response.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData._id,
            name: userData.username,
          })
        );
        setVisible(true);
        setLoading(false);
        setIsAuthenticad(true);
        navigate("/");
        return;
      }
      console.log(response)
      setErrorFlag(true);
       setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorFlag(true);
     
    }
  };

  useEffect(() => {
    if (location.state?.showAlert) {
      setFlagVisible(true);
    }
  }, [location.state]);

  return (
    <>
      <Alert
        msg={"Login first"}
        description={"Login or signup to continue"}
        visible={flagVisible}
        setVisible={setFlagVisible}
        theme="warning"
      />
      <Alert
        msg={"Feature not avaliable"}
        description={"Forgot password feature is currently under development"}
        visible={alertVisible}
        setVisible={serAlertVisible}
        duration={"3000"}
        theme="warning"
      />
      <Alert
        msg={"Invalid username or password"}
        description={"If you are new, try entering a unique username as it might be taken already!"}
        visible={errorFlag}
        setVisible={setErrorFlag}
        duration={"5000"}
        theme="error"
      />
      <div className="sm:px-64 h-[90vh] sm:block flex flex-col justify-center">
        <div className="sm:flex sm:min-h-full sm:flex-col sm:justify-center px-6 py-12 lg:px-8 shadow-md rounded-lg">
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <div className="text-sky-500 font-bold text-xl">CollabAI</div>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  className="flex text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleOnChange}
                    autocomplete="name"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-sky-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-sky-600 hover:text-sky-500"
                      onClick={() => serAlertVisible(true)}
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleOnChange}
                    autocomplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-sky-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex">
                <PrimaryBtn
                  classname="flex justify-center w-full"
                  onclick={handleSubmitUser}
                  loader={loading}
                >
                  Sign in
                </PrimaryBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
