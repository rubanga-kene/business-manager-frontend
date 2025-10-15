
"use client";
import { useEffect, useState } from 'react';
import { fetchCategorySummary } from '@/services/categories';
// import { Category } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, FolderX, TrendingUp } from "lucide-react";

interface CategoriesStatCardsProps {
  refreshTrigger?: number; // optional prop
}

interface CategorySummary {
  total_categories: number;
  most_populated: { name: string; count: number } | null;
  least_populated: { name: string; count: number } | null;
  uncategorized_count: number;
}

export default function CategoriesStatCards({ refreshTrigger }: CategoriesStatCardsProps) {

const [summary, setSummary] = useState<CategorySummary | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      const data = await fetchCategorySummary();
      console.log(data)
      setSummary(data);
    };
    loadSummary();
  }, [refreshTrigger]); // re-run when refreshTrigger changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Categories</p>
              <h3 className="text-2xl font-bold">{summary?.total_categories || 'None'}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <ArrowUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Most Populated Category
              </p>
              <h3 className="text-2xl font-bold">{summary?.most_populated?.name|| 'None'}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <ArrowDown className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Least Populated Category
              </p>
              <h3 className="text-2xl font-bold">{summary?.least_populated?.name || 'None'}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-50 dark:bg-amber-50 p-3 rounded-full mr-4">
              <FolderX className="h-6 w-6 text-red-900" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Uncategorized</p>
              <h3 className="text-2xl font-bold">{summary?.uncategorized_count || '0'}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
  )

}