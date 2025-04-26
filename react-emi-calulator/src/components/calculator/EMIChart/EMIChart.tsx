import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {generateAmortizationData} from "./utils";
import {CustomTooltip} from "./_ui/CustomToolTip";

interface EMIChartProps {
	principal: number;
	interestRate: number;
	loanTenure: number;
	emi: number;
	isCalculated: boolean;
}

export function EMIChart({principal, interestRate, loanTenure, emi, isCalculated}: EMIChartProps) {
	if (!isCalculated) {
		return null;
	}

	const data = generateAmortizationData(principal, interestRate, loanTenure, emi);

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
			</CardHeader>
			<CardContent>
				<div className='h-[400px] w-full'>
					<ResponsiveContainer width='100%' height='100%'>
						<AreaChart
							data={data}
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
								axisLine={{stroke: chartColors.grid}}
								tickLine={{stroke: chartColors.grid}}
								padding={{left: 10, right: 10}}
							/>
							<YAxis
								tickFormatter={value => {
									if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
									if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
									return value.toString();
								}}
								axisLine={{stroke: chartColors.grid}}
								tickLine={{stroke: chartColors.grid}}
							/>
							<Tooltip content={<CustomTooltip />} />

							{/* Add a reference line to show half-way point */}
							<ReferenceLine
								x={data[Math.floor(data.length / 2)]?.label}
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
									paddingTop: 16,
									fontSize: 13,
								}}
								formatter={value => {
									return <span className='text-sm font-medium'>{value}</span>;
								}}
							/>

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
				</div>
				<div className='mt-4 text-sm text-muted-foreground'>
					<p className='text-center'>
						This chart illustrates how your loan balance decreases over the loan tenure while showing the cumulative principal and interest payments.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
