import {TrendingUp} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {generateAmortizationData} from "../utils";
const chartData = [
	{month: "January", desktop: 186, mobile: 80},
	{month: "February", desktop: 305, mobile: 200},
	{month: "March", desktop: 237, mobile: 120},
	{month: "April", desktop: 73, mobile: 190},
	{month: "May", desktop: 209, mobile: 130},
	{month: "June", desktop: 214, mobile: 140},
];
const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

interface EMIChartProps {
	principal: number;
	interestRate: number;
	loanTenure: number;
	emi: number;
	isCaclulated: boolean;
}

export function EMIChart(props: EMIChartProps) {
	const {principal, interestRate, loanTenure, emi, isCaclulated} = props;
	const chartData3 = generateAmortizationData(principal, interestRate, loanTenure, emi);
	console.log("chartData3", chartData3);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Loan Amortization Schedule</CardTitle>
				<CardDescription>
					{isCaclulated ? (
						<p className='text-sm text-muted-foreground'>
							Your monthly EMI is <span className='font-medium'>{emi}</span> for a loan amount of <span className='font-medium'>{principal}</span> at an
							interest rate of <span className='font-medium'>{interestRate}</span>% for a tenure of <span className='font-medium'>{loanTenure}</span> months.
						</p>
					) : (
						<p className='text-sm text-muted-foreground'>Please enter the loan amount, interest rate, and tenure to see the amortization schedule.</p>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={value => value.slice(0, 3)} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
						<Area dataKey='mobile' type='natural' fill='var(--color-mobile)' fillOpacity={0.4} stroke='var(--color-mobile)' stackId='a' />
						<Area dataKey='desktop' type='natural' fill='var(--color-desktop)' fillOpacity={0.4} stroke='var(--color-desktop)' stackId='a' />
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						<div className='flex items-center gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>January - June 2024</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
