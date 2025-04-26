import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// EMI calculation utility functions
export function calculateEMI(principal: number, interestRate: number, tenureInMonths: number): number {
	// Convert annual interest rate to monthly rate and decimal form
	const monthlyRate = interestRate / 12 / 100;

	// Calculate EMI using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
	const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

	return isNaN(emi) || !isFinite(emi) ? 0 : emi;
}

// Calculate total payment over the entire loan tenure
export function calculateTotalPayment(emi: number, tenureInMonths: number): number {
	return emi * tenureInMonths;
}

// Calculate total interest payable
export function calculateTotalInterest(totalPayment: number, principal: number): number {
	return totalPayment - principal;
}

// Format number as currency with better handling of large numbers
export function formatCurrency(amount: number): string {
	// For large numbers > 1 crore, show in crores format
	if (amount >= 10000000) {
		const inCrores = amount / 10000000;
		return `₹${inCrores.toFixed(2)} Cr`;
	}
	// For numbers > 1 lakh, show in lakhs format
	else if (amount >= 100000) {
		const inLakhs = amount / 100000;
		return `₹${inLakhs.toFixed(2)} L`;
	}
	// For regular numbers, use the standard formatter
	else {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			maximumFractionDigits: 0,
		}).format(amount);
	}
}
