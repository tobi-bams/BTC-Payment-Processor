import AuthForm from '../components/forms/AuthForm';

const AuthPage = () => {
  return (
    <div className="w-5/6 sm:w-2/3 md:w-1/3 my-12 py-6 px-6 shadow mx-auto rounded-sm">
      <div className="">
        <h2 className="text-3xl text-center text-primary">BTC Payment Processor</h2>
      </div>
      <div className="mt-12">
        <AuthForm />
      </div>
    </div>
  )
};

export default AuthPage;
