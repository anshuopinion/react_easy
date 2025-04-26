export interface AmortizationEntry {
	month: number;
	balance: number;
	totalPaid: number;
	principalPaid: number;
	interestPaid: number;
	label: string;
}
