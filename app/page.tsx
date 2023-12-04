import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col justify-center bg-black ">
      <div className="col p-16 text-gray-500">
        <AuthForm />
        <h1 className="header">Supabase Auth + Storage</h1>
        <p className="">N e s s t</p>
      </div>
      <div className="col-6 auth-widget"></div>
    </div>
  );
}
