"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ComingSoonContentProps {
  section: string
  onReturnToDashboard: () => void
}

export default function ComingSoonContent({ section, onReturnToDashboard }: ComingSoonContentProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This section is under development and will be available soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The {section.charAt(0).toUpperCase() + section.slice(1)} module is currently being built. Please check back
            later for advanced business management features.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onReturnToDashboard}>Return to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
