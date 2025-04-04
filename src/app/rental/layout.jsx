import RentalNavBar from "@/components/RentalNavBar"
import { checkOwner } from "@/lib/checkOwner"

async function layout({children}) {
  await checkOwner()
  return (
    <div className=" w-full min-h-screen" >
      <RentalNavBar />
        {children}
    </div>
  )
}

export default layout
