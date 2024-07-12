import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CardProvider } from "@/context/CardContext";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-[100vh] max-h-screen relative">
        <AuthProvider>
          <CardProvider>                
            {children}
          </CardProvider>   
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
