import { Poppins} from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Rent Ride",
  description: "Rent a car easily",
  icons: {
    icon: "/smLogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />  
      </head>
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <NavBar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
