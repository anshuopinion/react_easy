export const calculateEMI = (amount: number, rate: number, months: number) => {
	const montlyRate = rate / 12 / 100;

	// Calculate EMI using the formula: P * r * (1 + mr)^n / ((1 + mr)^n - 1)

	const emi = (amount * montlyRate * Math.pow(1 + rate, montlyRate)) / (Math.pow(1 + montlyRate, months) - 1);

	return isNaN(emi) || !isFinite(emi) ? 0 : emi;
};

export const calculateTotalPayment = (emi: number, months: number) => {
	return emi * months;
};
export const calculateTotalIntreset = (totalPayment: number, amount: number) => {
	return amount - totalPayment;
};

export const formatCurrency = (amount: number) => {
	// for values greater than 1Cr
	if (amount > 10000000) {
		const Cr = amount / 10000000;
		return `₹${Cr.toFixed(2)} Cr`;
		// for values greater than 1lakh
	} else if (amount > 100000) {
		const Cr = amount / 100000;
		return `₹${Cr.toFixed(2)} L`;
	} else {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			maximumFractionDigits: 0,
		}).format(amount);
	}
};
