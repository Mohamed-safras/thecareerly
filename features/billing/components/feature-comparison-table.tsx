import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { featureMatrix } from "../data/plans-data";

export const FeatureComparisonTable = () => {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-4 w-4 text-primary mx-auto" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />
      );
    }
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">
          Feature Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[200px] min-w-[150px]">
                  Feature
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  Starter
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  Professional
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  Enterprise
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureMatrix.map((feature, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-muted-foreground text-sm">
                    {feature.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderCell(feature.starter)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderCell(feature.professional)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderCell(feature.enterprise)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
