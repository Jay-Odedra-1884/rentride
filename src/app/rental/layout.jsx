import RentalNavBar from "@/components/RentalNavBar"

function layout({children}) {
  return (
    <div className=" w-full min-h-screen" >
      <RentalNavBar />
        {children}
    </div>
  )
}

export default layout
