import { SignedOut} from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
import SignInPage from "@/components/SignInPage"

function layout({children}) {
  return (
    <div>
        <SignedIn>
        {children}
        </SignedIn>
        <SignedOut>
           <SignInPage></SignInPage>
        </SignedOut>
    </div>
  )
}

export default layout
