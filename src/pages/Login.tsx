// import LoginForm from "../features/auth/LoginForm";
import LoginForm from "../features/auth/LoginForm";
import { useDynamicTitle } from "../utils";

const Login: React.FC = () => {
  useDynamicTitle("Đăng nhập");

  return (
    <div className="flex py-5">
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="lg:shadow-m lg:borde flex items-center justify-between rounded-xl p-8 sm:bg-white">
          <div className="hidden w-1/2 lg:block">
            <img src="/login_background.jpg" alt="Login background" />
          </div>

          <div className="mx-auto w-[95%] rounded-xl border bg-slate-100 p-5 shadow transition-all duration-1000 md:w-[60%] lg:w-[40%] xl:w-[30%]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Đăng nhập
              </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
