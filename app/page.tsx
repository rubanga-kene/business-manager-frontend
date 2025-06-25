import Dashboard from "@/app/dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <div >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Dashboard/>
    </ThemeProvider>
    </div>
    
  )
}
