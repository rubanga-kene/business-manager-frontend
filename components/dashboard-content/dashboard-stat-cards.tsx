
import { TrendingUp, DollarSign } from "lucide-react"
import { Card, CardContent,} from "@/components/ui/card"

export default function DashboardStatCards(){
    return(
        <>
              {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
            
              <TrendingUp/>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
               Total Sales <span className="text-xs">(Today)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">UGX. 234,500</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                  +24%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Yesterday: UGX. 345,000</p>
            </div>
          </CardContent>
        </Card>

          <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-cyan-50 dark:bg-cyan-950 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Sales <span className="text-xs">(This week)</span>
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold mr-2">UGX. 237,500</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                  +31%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Previous week: UGX. 1,870,500</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">UGX. 1,025,000</h3>
              <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
        </>
    )
}