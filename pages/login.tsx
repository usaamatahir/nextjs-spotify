import { FC } from "react";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";

interface LoginProviderProps {
  providers: {
    spotify: {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    };
  };
}

const Login: FC<LoginProviderProps> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="relative w-32 h-32 object-contain mb-5">
        <Image src="/logo.png" layout="fill" objectFit="contain" alt="" />
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-[#18D860] text-white p-5 rounded-full"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
