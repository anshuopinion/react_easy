import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";

// Define the types for our form inputs
interface InputFormProps {
	principal: number;
	setPrincipal: (value: number) => void;
	interestRate: number;
	setInterestRate: (value: number) => void;
	loanTenure: number;
	setLoanTenure: (value: number) => void;
	onCalculate: () => void;
}

export function InputForm({principal, setPrincipal, interestRate, setInterestRate, loanTenure, setLoanTenure, onCalculate}: InputFormProps) {
	// Handle principal amount change
	const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value) || 0;
		setPrincipal(value);
	};

	// Handle interest rate change
	const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value) || 0;
		setInterestRate(value);
	};

	// Handle tenure change
	const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value) || 0;
		setLoanTenure(value);
	};

	// Handle slider value change
	const handleSliderChange = (value: number[]) => {
		setLoanTenure(value[0]);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Loan Information</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				{/* Loan Amount Input */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium'>Loan Amount (₹)</label>
					<Input type='number' min='0' value={principal || ""} onChange={handlePrincipalChange} placeholder='Enter loan amount' />
				</div>

				{/* Interest Rate Input */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium'>Interest Rate (% per annum)</label>
					<Input type='number' min='0' max='30' step='0.1' value={interestRate || ""} onChange={handleInterestChange} placeholder='Enter interest rate' />
				</div>

				{/* Loan Tenure Input */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium'>Loan Tenure (months): {loanTenure}</label>
					<div className='flex items-center gap-4'>
						<Slider value={[loanTenure]} min={1} max={360} step={1} onValueChange={handleSliderChange} />
						<Input type='number' min='1' max='360' value={loanTenure || ""} onChange={handleTenureChange} className='w-20' />
					</div>
				</div>

				{/* Calculate Button */}
				<Button onClick={onCalculate} className='w-full'>
					Calculate EMI
				</Button>
			</CardContent>
		</Card>
	);
}
