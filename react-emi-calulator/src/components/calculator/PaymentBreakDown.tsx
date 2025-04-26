import {formatCurrency} from "@/utils";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

interface PaymentBreakDownProps {
	principal: number;
	totalInterest: number;
	isCalculated: boolean;
}
export const PaymentBreakDown = (props: PaymentBreakDownProps) => {
	const {principal, totalInterest, isCalculated} = props;

	if (!isCalculated) {
		return null;
	}

	const total = principal + totalInterest;
	const principalPercentage = Math.round((principal / total) * 100);
	const interestPercentage = Math.round((totalInterest / total) * 100);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Breakdown</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='h-6 w-full overflow-hidden rounded-full bg-muted'>
					<div
						className='h-full bg-primary'
						style={{
							width: `${principalPercentage}%`,
						}}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4 space-x-2 '>
					<div className='flex items-center gap-2  '>
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
			</CardContent>
		</Card>
	);
};
