import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


export default function ErrorDisplay(){
    return (
        <Alert className="mb-4" variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to fetch your data.</AlertTitle>
        <AlertDescription>
              <p>Please make sure you are connected to the internet and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your internet connection</li>
                <li>Try refreshing the page</li>
                <li>Contact system administrator</li>
            </ul>
        </AlertDescription>
      </Alert>
    )
}