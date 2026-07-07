"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/ShadcnCard/ShadcnCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/Charts/chart";

import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";

import {
  getGraphStats,
  useCurrencyGraphData,
  type GraphRange,
} from "@/shared/api/frankfurter";
import SimpleLoader from "@/components/ui/InputField/SimpleLoader/simpleLoader";
import type { CurrencyCode } from "@/shared/constants/flagIcons";

const chartConfig = {
  rate: {
    label: "Rate",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
}

function formatDateLabel(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function CurrencyGraph() {
  const {
    selectedGraphRange,
    sourceCurrency: baseCurrency,
    targetCurrency: quoteCurrency,
  } = useCurrencyConverter();

  const {
    data = [],
    isLoading,
    isError,
  } = useCurrencyGraphData({
    base: baseCurrency.code as CurrencyCode,
    quote: quoteCurrency.code as CurrencyCode,
    range: selectedGraphRange as GraphRange,
  });

  const stats = React.useMemo(() => getGraphStats(data), [data]);

  if (isLoading) {
    return (
      <Card className="pt-0 bg-[#202022]">
        <CardContent className="h-62.5 flex items-center justify-center">
          <SimpleLoader />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="pt-0 bg-[#202022]">
        <CardContent className="h-62.5 flex items-center justify-center text-white">
          Failed to load graph data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="pt-0 bg-[#202022]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex justify-between w-full items-center">
          <CardTitle className="text-[16px] text-white">
            {baseCurrency.code}/{quoteCurrency.code}
          </CardTitle>

          <CardDescription className="text-[14px]">
            Last {formatNumber(stats.last)} · {selectedGraphRange}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--lime-500)" stopOpacity={1} />
                <stop offset="100%" stopColor="#171719" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDateLabel}
            />

            <YAxis
              dataKey="rate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => Number(value).toFixed(2)}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => formatDateLabel(String(value))}
                  formatter={(value) => formatNumber(Number(value))}
                />
              }
            />

            <Area
              dataKey="rate"
              type="linear"
              fill="url(#fillRate)"
              stroke="var(--lime-500)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
