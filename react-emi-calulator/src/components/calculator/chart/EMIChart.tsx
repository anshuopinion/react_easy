import {Area, AreaChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartTooltip} from "@/components/ui/chart";
import {generateAmortizationData} from "../utils";
import {CustomToolTip} from "./CustomToolTip";

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

	const chartColors = {
		balance: "#34d399",
		principalPaid: "#6366f1",
		interestPaid: "#fb7185",
		grid: "#e2e8f0",
	};

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
			<CardContent className='h-[400px] w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<AreaChart
						data={chartData3}
						margin={{
							top: 20,
							right: 30,
							left: 10,
							bottom: 20,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' stroke={chartColors.grid} opacity={0.5} vertical={false} />

						<XAxis
							dataKey='label'
							tick={{fontSize: 12}}
							axisLine={{
								stroke: chartColors.grid,
							}}
							tickLine={{
								stroke: chartColors.grid,
								strokeWidth: 1,
								strokeOpacity: 0.5,
							}}
							padding={{left: 10, right: 10}}
						/>
						<YAxis
							tickFormatter={value => {
								if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
								if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
								return value.toString();
							}}
							axisLine={{
								stroke: chartColors.grid,
							}}
							tickLine={{
								stroke: chartColors.grid,
								strokeWidth: 1,
								strokeOpacity: 0.5,
							}}
						/>

						<ReferenceLine
							x={chartData3[Math.floor(chartData3.length / 2)]?.label}
							stroke='#94a3b8'
							strokeDasharray='3 3'
							label={{
								value: "Halfway",
								position: "top",
								fill: "#94a3b8",
								fontSize: 12,
							}}
						/>
						<Legend
							wrapperStyle={{
								paddingTop: 10,
								fontSize: 12,
							}}
							formatter={value => {
								return <span className='text-sm font-medium'>{value}</span>;
							}}
						/>
						<ChartTooltip cursor={false} content={<CustomToolTip />} />

						<Area
							type='monotone'
							dataKey='balance'
							stackId='1'
							stroke={chartColors.balance}
							fill={chartColors.balance}
							fillOpacity={0.6}
							name='Outstanding Balance'
							activeDot={{r: 6, strokeWidth: 0}}
						/>
						<Area
							type='monotone'
							dataKey='principalPaid'
							stackId='2'
							stroke={chartColors.principalPaid}
							fill={chartColors.principalPaid}
							fillOpacity={0.6}
							name='Principal Paid'
							activeDot={{r: 5, strokeWidth: 0}}
						/>
						<Area
							type='monotone'
							dataKey='interestPaid'
							stackId='2'
							stroke={chartColors.interestPaid}
							fill={chartColors.interestPaid}
							fillOpacity={0.6}
							name='Interest Paid'
							activeDot={{r: 5, strokeWidth: 0}}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
