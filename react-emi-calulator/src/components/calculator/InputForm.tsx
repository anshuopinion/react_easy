import type {ChangeEvent} from "react";
import {Button} from "../ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {Slider} from "../ui/slider";

interface InputFormProps {
	principal: number;
	setPrincipal: (value: number) => void;
	interestRate: number;
	setInterestRate: (value: number) => void;
	loanTenure: number;
	setLoanTenure: (value: number) => void;
	onCalculate: () => void;
}

export function InputForm(props: InputFormProps) {
	const {principal, setPrincipal, interestRate, setInterestRate, loanTenure, setLoanTenure, onCalculate} = props;

	const handlePrincipalChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setPrincipal(value);
	};
	const handleInterestRateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setInterestRate(value);
	};

	const handleTenureChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setLoanTenure(value);
	};

	const handleSliderChange = (value: number[]) => {
		setLoanTenure(value[0]);
	};

	return (
		<Card className='h-full'>
			<CardHeader>
				<CardTitle>Loan Information</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				{/* Loan Amont Input */}
				<div className='space-y-2'>
					<Label htmlFor='loan-amount'>Loan Amount (₹)</Label>
					<Input type='number' id='loan-amount' min={0} value={principal ?? ""} placeholder='Enter loan amount' onChange={handlePrincipalChange} />
				</div>
				{/* Interest Rate Input */}
				<div className='space-y-2'>
					<Label htmlFor='intrest-rate'>Interest Rate (% per annum)</Label>

					<Input
						type='number'
						id='intrest-rate'
						placeholder='Enter interest rate'
						value={interestRate ?? ""}
						onChange={handleInterestRateChange}
						min={0}
						max={30}
						step={0.01}
					/>
				</div>

				{/* Loan Tenure Input */}

				<div className='space-y-2'>
					<Label htmlFor='loan-tenure'>Loan Tenure (months):{loanTenure}</Label>
					<div className='flex items-center gap-4'>
						<Slider min={0} max={360} onValueChange={handleSliderChange} />
						<Input type='number' id='loan-tenure' onChange={handleTenureChange} value={loanTenure ?? ""} min={0} max={30} step={0.01} className='w-20' />
					</div>
				</div>

				<Button className='w-full' onClick={onCalculate}>
					Calculate EMI
				</Button>
			</CardContent>
		</Card>
	);
}
