"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDashed } from "lucide-react";

interface QuickActionsProps {
  onCreateLocation?: () => void;
  onCreateManager?: () => void;
  onCreateRegion?: () => void;
}

export function QuickActions({
  onCreateLocation,
  onCreateManager,
  onCreateRegion,
}: QuickActionsProps) {
  return (
    <Card className="bg-white border-gray-200 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 h-12 bg-transparent"
          onClick={onCreateLocation}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new location
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 h-12 bg-transparent"
          onClick={onCreateManager}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new Manager
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 h-12 bg-transparent"
          onClick={onCreateRegion}
        >
          <CircleDashed className="mr-2 h-4 w-4" />
          Create a new Region
        </Button>
      </CardContent>
    </Card>
  );
}
