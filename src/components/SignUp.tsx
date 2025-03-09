import { SignUp } from "@clerk/clerk-react";
import { Store } from "lucide-react";

export default function SignUpRoute() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Store className="text-blue-600" size={48} />
        </div>
        <h2 className="mt-6 cursor-pointer text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
