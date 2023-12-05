import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <div className=" h-screen flex flex-col justify-center bg-black ">
      <div className="col p-16 text-gray-500">
        <AuthForm />
      </div>
    </div>
  );
}
