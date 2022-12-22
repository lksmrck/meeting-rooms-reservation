import LoginForm from "../../components/login/LoginForm";

const Auth = () => {
  return (
    <div>
      <section className="flex justify-center items-center bg-center bg-cover bg-no-repeat bg-loginBg h-content ">
        <div className=" flex flex-col justify-center mb-10 items-center w-80 h-80 md:w-96 md:h-96 bg-white  rounded-lg relative shadow-lg overflow-scroll scrollbar-hide">
          <div
            style={{ borderRadius: "8px 8px 50% 50%" }}
            className="h-20 w-full bg-teal-600 absolute top-0 flex flex-col items-center justify-center"
          >
            <h1 className="text-2xl font-bold text-gray-50">Login</h1>
            <h3 className=" text-sm text-gray-50">Enter your credentials</h3>
          </div>

          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default Auth;
