
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Background } from "@/components/background/Background";
import { CardProvider } from "@/context/CardContext";
import { TransactionProvider } from "@/context/TransContext";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="h-screen max-h-screen flex items-center justify-center">
        <AuthProvider>
          <CardProvider>
            <TransactionProvider>
              <main className="rounded-xl w-[95%] max-w-[1920px] h-[calc(100vh-40px)] mx-auto bg-gray-900 text-white flex flex-col justify-center relative">
                {children}
              </main>
              <Background />
            </TransactionProvider>
          </CardProvider >
        </AuthProvider >
      </body>
    </html>
  );
}
