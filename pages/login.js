import React from "react";
import { getProviders, signIn } from "next-auth/react";

// Here providers = we are destructuring providers that we written and exported in async function getServerSideProps

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-40 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {/* Whenever you use map function always use key to enhance the react
          performance. */}
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  //Whenever you use getServerSideProps then it always returns something otherwise it will get error.

  return {
    props: {
      providers,
    },
  };
}
