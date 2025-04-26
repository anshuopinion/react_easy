import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/lib/utils";

interface ResultsDisplayProps {
	emi: number;
	totalInterest: number;
	totalPayment: number;
	isCalculated: boolean;
}

export function ResultsDisplay({emi, totalInterest, totalPayment, isCalculated}: ResultsDisplayProps) {
	if (!isCalculated) {
		return null; // Don't render anything if calculation hasn't been done yet
	}

	const results = [
		{title: "Monthly EMI", value: emi},
		{title: "Total Interest", value: totalInterest},
		{title: "Total Payment", value: totalPayment},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>EMI Calculation Results</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					{results.map((result, index) => (
						<div key={index} className='rounded-lg bg-muted p-4 text-center'>
							<h3 className='text-sm font-medium text-muted-foreground'>{result.title}</h3>
							<p className='mt-2 text-xl font-bold overflow-hidden text-ellipsis'>{formatCurrency(result.value)}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
