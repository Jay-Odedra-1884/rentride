import { SignIn } from "@clerk/nextjs"

function signInPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
        <SignIn></SignIn>
    </div>
  )
}

export default signInPage;
