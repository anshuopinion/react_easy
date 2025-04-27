export interface AmortizationEntry {
	month: number;
	balance: number;
	totalPaid: number;
	principalPaid: number;
	interestPaid: number;
	label: string;
}

export function generateAmortizationData(principal: number, interestRate: number, loanTenureMonths: number, emi: number) {
	// don't calculuate if no emi is present
	if (emi === 0) return [];

	const monthlyRate = interestRate / 12 / 100;

	let balance = principal;

	const schedule: AmortizationEntry[] = [];

	//  For chart simplicity, we'll generate data points for every year (or every 6 months for shorter loans)
	const interval = loanTenureMonths <= 60 ? 3 : loanTenureMonths <= 120 ? 6 : 12;

	for (let month = 0; month <= loanTenureMonths; month += interval) {
		if (month === 0) {
			schedule.push({
				month,
				balance,
				totalPaid: 0,
				principalPaid: 0,
				interestPaid: 0,
				label: "0",
			});
			continue;
		}

		// Calculate values for the current interval
		let intervalPrincipalPaid = 0;
		let intervalInterestPaid = 0;

		// Process each month in the interval
		for (let i = 0; i < interval && month - interval + i < loanTenureMonths; i++) {
			const interest = balance * monthlyRate;
			const principal = emi - interest;
			intervalPrincipalPaid += principal;
			intervalInterestPaid += interest;
			balance -= principal;

			// Ensure balance doesn't go below zero due to rounding errors
			if (balance < 0) balance = 0;
		}

		const previousTotalPaid = schedule[schedule.length - 1].totalPaid;
		const totalPaid = previousTotalPaid + intervalInterestPaid + intervalPrincipalPaid;

		let label;
		if (month < 12) {
			label = `${month}m`;
		} else {
			const years = Math.floor(month / 12);
			const months = month % 12;

			label = month === 0 ? `${years}y` : `${years}y ${months}m`;
		}

		const lastItem = schedule[schedule.length - 1];
		schedule.push({
			month,
			balance: Math.max(balance, 0),
			totalPaid,
			principalPaid: lastItem.principalPaid + intervalPrincipalPaid,
			interestPaid: lastItem.interestPaid + intervalInterestPaid,
			label,
		});
	}

	return schedule;
}
