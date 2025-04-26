import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/lib/utils";

interface PaymentBreakdownProps {
	principal: number;
	totalInterest: number;
	isCalculated: boolean;
}

export function PaymentBreakdown({principal, totalInterest, isCalculated}: PaymentBreakdownProps) {
	if (!isCalculated) {
		return null; // Don't render if not calculated
	}

	const total = principal + totalInterest;
	const principalPercentage = Math.round((principal / total) * 100);
	const interestPercentage = Math.round((totalInterest / total) * 100);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Breakdown</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{/* Visual bar chart */}
					<div className='h-6 w-full overflow-hidden rounded-full bg-muted'>
						<div className='h-full bg-primary' style={{width: `${principalPercentage}%`}}></div>
					</div>

					{/* Legend and percentages */}
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex items-center space-x-2'>
							<div className='h-3 w-3 rounded-full bg-primary'></div>
							<div className='overflow-hidden'>
								<p className='text-sm font-medium'>Principal</p>
								<p className='text-sm text-muted-foreground truncate'>
									{formatCurrency(principal)} ({principalPercentage}%)
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='h-3 w-3 rounded-full bg-muted'></div>
							<div className='overflow-hidden'>
								<p className='text-sm font-medium'>Interest</p>
								<p className='text-sm text-muted-foreground truncate'>
									{formatCurrency(totalInterest)} ({interestPercentage}%)
								</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
