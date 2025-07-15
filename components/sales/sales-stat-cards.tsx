import { DollarSign } from "lucide-react";
import { ShoppingCart, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SalesStatCards() {
  return (
    <>
      {/* /////////  SALES CARDS  ///////////// */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <ShoppingCart className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales Today</p>
              <h3 className="text-2xl font-bold">UGX. 125,000</h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                +12% from yesterday
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales this Week</p>
              <h3 className="text-2xl font-bold">UGX. 398,500</h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                +8% from last week
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <Briefcase className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales this Month</p>
              <h3 className="text-2xl font-bold">UGX. 2,526,500</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                +22% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
