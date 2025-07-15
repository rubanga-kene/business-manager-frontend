"use client";
import { useEffect, useState } from 'react';
import { fetchInventorySummary } from '@/services/products';
import { Product } from '@/lib/types';
import { Card, CardContent, } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Star } from "lucide-react";


export default function InventoryStatCards(){
  const [summary, setSummary] = useState<{
    newest: Product | null;
    highest_quantity: Product | null;
    lowest_quantity: Product | null;
  }>({ newest: null, highest_quantity: null, lowest_quantity: null });

  useEffect(() => {
    const loadSummary = async () => {
      const data = await fetchInventorySummary();
      setSummary(data);
    };
    loadSummary();
  }, []);


    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full mr-4">
              <Star className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Stock</p>
              <h3 className="text-2xl font-bold">{summary.newest?.product_name || 'None'}</h3>
              <p className="text-xs text-blue-500 dark:text-blue-500">
                No. of Items: {summary.newest?.quantity || 'None'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-full mr-4">
              <ArrowUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Stock</p>
              <h3 className="text-2xl font-bold">{summary.highest_quantity?.product_name || 'None'} </h3>
              <p className="text-xs text-green-600 dark:text-green-400">
                Items left: {summary.highest_quantity?.quantity}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-full mr-4">
              <ArrowDown className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lowest Stock</p>
              <h3 className="text-2xl font-bold">{summary.lowest_quantity?.product_name || 'None'} </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Items left: {summary.lowest_quantity?.quantity}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}