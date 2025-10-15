import Dashboard from "@/app/Dashboard"
// import { ThemeProvider } from "next-themes"; 
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
      <ThemeProvider >
      <Dashboard/>
      </ThemeProvider>
  )
}
