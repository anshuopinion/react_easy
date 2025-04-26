import {formatCurrency} from "@/utils";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

interface ResultsDisplayProps {
	emi: number;
	totalPayment: number;
	totalInterest: number;
	isCalculated: boolean;
}

export const ResultsDisplay = (props: ResultsDisplayProps) => {
	const {emi, totalPayment, totalInterest, isCalculated} = props;

	if (!isCalculated) {
		return null;
	}

	const results = [
		{
			title: "Monthly EMI",
			value: emi,
		},
		{title: "Total Interest", value: totalInterest},
		{title: "Total Payment", value: totalPayment},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>EMI Calculation Results</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{results.map((results, i) => {
						return (
							<div key={results.title} className='rounded-lg bg-muted p-4 text-center'>
								<h3 className='text-sm font-medium text-muted-foreground'>{results.title}</h3>
								<p className='mt-2 text-xl font-bold overflow-hidden text-ellipsis'>{formatCurrency(results.value)}</p>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};
