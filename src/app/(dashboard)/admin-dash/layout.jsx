
// "use client";

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { createTheme } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';

// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import SignInPage from "@/components/SignInPage";
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// const NAVIGATION = [
//   { kind: 'header', title: 'Main items' },
//   { segment: 'admin-dash', title: 'Dashboard', icon: <DashboardIcon /> },
  
 
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// export default function AdminDashboardLayout({ children }) {
//   // Set base path to '/dashboard/admin-dash'
//   const router = useDemoRouter('/admin-dash');
//   const nextRouter = useRouter(); // useRouter hook

//   return (
//     <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} branding={{logo: <Image src={'/Logo.png'} width={120} height={120} alt="RentRide" />, title: ""}}>
//       <DashboardLayout>
//         <SignedIn>
//           {children}
//         </SignedIn>
//         <SignedOut>
//           <SignInPage />
//         </SignedOut>
      
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// AdminDashboardLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };








import { SignedOut} from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
import SignInPage from "@/components/SignInPage"

function layout({children}) {
  return (
    <div className="px-14 py-5">
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
