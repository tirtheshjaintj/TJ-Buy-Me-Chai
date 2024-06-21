"use client";
import React, { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
   !session && <div className="text-white py-14 container mx-auto">
      <h1 className="text-center font-bold text-3xl">Login For Your Fans to Support You</h1>
      <div className="flex flex-col justify-center items-center gap-4 p-10">
        <button
          onClick={() => signIn("github")}
          className="flex items-center animate-shimmer2  hover:animate-shimmer text-2xl bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 border border-white rounded-lg shadow-md max-w-xs px-6 py-2  font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-10 w-10 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 73 73"
          >
            <g fill="none" fillRule="evenodd">
              <g fillRule="nonzero">
                <rect
                  stroke="#000"
                  strokeWidth={2}
                  fill="#000"
                  x={-1}
                  y={-1}
                  width={71}
                  height={71}
                  rx={14}
                />
                <path
                  d="M58.307 21.428C55.896 17.297 52.625 14.027 48.495 11.616 44.364 9.205 39.854 8 34.962 8 30.07 8 25.559 9.205 21.428 11.616 17.297 14.027 14.027 17.297 11.616 21.428 9.205 25.559 8 30.07 8 34.961c0 5.875 1.714 11.158 5.143 15.851 3.429 4.693 7.859 7.94 13.288 9.742.632.117 1.1.034 1.404-.246.304-.281.456-.632.456-1.053 0-.07-.006-.702-.017-1.896-.012-1.194-.017-2.235-.017-3.124l-.808.14c-.515.094-1.164.134-1.948.122-.784-.012-1.598-.094-2.44-.247-.842-.151-1.626-.502-2.351-1.052-.726-.55-1.241-1.27-1.545-2.158l-.351-.808c-.234-.538-.602-1.135-1.106-1.79-.504-.655-1.013-1.1-1.528-1.334l-.245-.176c-.164-.116-.316-.257-.456-.42-.141-.163-.246-.327-.316-.491-.07-.164-.012-.299.176-.404.188-.105.527-.156 1.018-.156l.702.105c.468.094 1.047.374 1.737.842.691.468 1.259 1.077 1.704 1.825.538.96 1.187 1.691 1.948 2.194.76.503 1.527.754 2.299.754.772 0 1.439-.058 2-.175.561-.117 1.087-.293 1.579-.527.21-1.568.783-2.773 1.719-3.616-1.334-.14-2.533-.351-3.598-.632-1.064-.281-2.164-.737-3.299-1.37-1.135-.632-2.077-1.416-2.826-2.352-.749-.936-1.364-2.165-1.844-3.686-.48-1.521-.719-3.276-.719-5.266 0-2.833.924-5.243 2.773-7.232-.866-2.13-.784-4.517.246-7.162.679-.21 1.686-.052 3.02.474 1.334.527 2.311.978 2.932 1.352.621.374 1.118.691 1.493.948 2.177-.608 4.424-.912 6.741-.912s4.525.304 6.702.912l1.334-.842c.912-.562 1.989-1.077 3.229-1.545 1.24-.468 2.189-.597 2.844-.386 1.053 2.645 1.146 5.032.28 7.161 1.849 1.99 2.774 4.4 2.774 7.232 0 1.99-.24 3.751-.719 5.284-.48 1.533-1.1 2.761-1.861 3.686-.761.924-1.709 1.703-2.844 2.335-1.135.632-2.235 1.089-3.299 1.37-1.217 1.052-1.825 2.714-1.825 4.984v7.406c0 .421.146.772.439 1.053.293.281.755.364 1.387.246 5.431-1.801 9.86-5.048 13.288-9.741 3.429-4.692 5.144-9.975 5.144-15.85 0-4.89-1.206-9.401-3.617-13.532z"
                  fill="#FFF"
                />
              </g>
            </g>
          </svg>
          <span>Continue with GitHub</span>
        </button>

        <button
          onClick={() => signIn("google")}
          className="flex items-center animate-shimmer2  hover:animate-shimmer text-2xl bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 border border-white rounded-lg shadow-md max-w-xs px-6 py-2  font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-10 w-10 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-0.5 0 48 48"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(-401 -860)">
                <g transform="translate(401 860)">
                  <path
                    d="M9.827 24c0-1.524.253-2.985.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.261 2.407 10.388l7.905-6.051c-.447-1.365-.697-2.821-.697-4.337"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094l6.837-6.827C35.036 2.773 29.695.533 23.714.533c-9.287 0-17.269 5.311-21.091 13.071L10.532 19.644c1.822-5.532 7.016-9.511 13.182-9.511"
                    fill="#EB4335"
                  />
                  <path
                    d="M23.714 37.867c-6.165 0-11.36-3.978-13.182-9.511L2.623 34.395c3.822 7.761 11.804 13.071 21.091 13.071 5.732 0 11.204-2.035 15.311-5.848l-7.507-5.804c-2.118 1.335-4.785 2.053-7.804 2.053"
                    fill="#34A853"
                  />
                  <path
                    d="M46.823 24c0-1.354-.12-2.665-.346-3.927H23.714v8.34h12.994c-.562 2.678-1.942 4.92-3.98 6.456l7.506 5.804c4.392-4.053 6.897-10.03 6.897-16.673"
                    fill="#4285F4"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => signIn("facebook")}
          className="flex items-center animate-shimmer2  hover:animate-shimmer text-2xl bg-[linear-gradient(110deg,#001f3f,45%,#007bff,55%,#001f3f)] bg-[length:200%_100%] p-6 border border-white rounded-lg shadow-md max-w-xs px-6 py-2  font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 216 216"
            className="h-10 w-10 mr-2"
          >
            <path
              fill="#fff"
              d="M204.1 0H11.9A11.9 11.9 0 000 11.9v192.2A11.9 11.9 0 0011.9 216H108v-83.7H81.5V100.5H108v-25c0-26.2 15.9-40.5 39.2-40.5 11.1 0 20.6.8 23.3 1.2v27h-16c-12.5 0-14.9 5.9-14.9 14.6v19.1h29.8l-3.9 31.8h-25.9V216h50.7A11.9 11.9 0 00216 204.1V11.9A11.9 11.9 0 00204.1 0"
            />
          </svg>
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
