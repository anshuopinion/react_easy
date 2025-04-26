import {useState} from "react";
import {createFileRoute} from "@tanstack/react-router";
import {InputForm} from "@/components/calculator/InputForm";
import {ResultsDisplay} from "@/components/calculator/ResultsDisplay";
import {PaymentBreakdown} from "@/components/calculator/PaymentBreakdown";
import {EMIChart} from "@/components/calculator/EMIChart/EMIChart";
import {calculateEMI, calculateTotalPayment, calculateTotalInterest} from "@/lib/utils";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	// State for loan details
	const [principal, setPrincipal] = useState<number>(1000000); // Default: 10 lakhs
	const [interestRate, setInterestRate] = useState<number>(8.5); // Default: 8.5%
	const [loanTenure, setLoanTenure] = useState<number>(180); // Default: 15 years (180 months)

	// State for calculation results
	const [emi, setEmi] = useState<number>(0);
	const [totalInterest, setTotalInterest] = useState<number>(0);
	const [totalPayment, setTotalPayment] = useState<number>(0);
	const [isCalculated, setIsCalculated] = useState<boolean>(false);

	// Function to calculate EMI and related values
	const handleCalculate = () => {
		// Calculate EMI
		const calculatedEmi = calculateEMI(principal, interestRate, loanTenure);

		// Calculate total payment
		const calculatedTotalPayment = calculateTotalPayment(calculatedEmi, loanTenure);

		// Calculate total interest
		const calculatedTotalInterest = calculateTotalInterest(calculatedTotalPayment, principal);

		// Update state with calculated values
		setEmi(calculatedEmi);
		setTotalPayment(calculatedTotalPayment);
		setTotalInterest(calculatedTotalInterest);
		setIsCalculated(true);
	};

	return (
		<div className='min-h-screen bg-background p-4 md:p-8'>
			<div className='mx-auto max-w-5xl space-y-8'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold tracking-tight'>EMI Calculator</h1>
					<p className='mt-2 text-muted-foreground'>Calculate your loan EMI, total interest payable, and more</p>
				</div>

				<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
					{/* Input Form */}
					<InputForm
						principal={principal}
						setPrincipal={setPrincipal}
						interestRate={interestRate}
						setInterestRate={setInterestRate}
						loanTenure={loanTenure}
						setLoanTenure={setLoanTenure}
						onCalculate={handleCalculate}
					/>

					<div className='space-y-6'>
						<ResultsDisplay emi={emi} totalInterest={totalInterest} totalPayment={totalPayment} isCalculated={isCalculated} />

						<PaymentBreakdown principal={principal} totalInterest={totalInterest} isCalculated={isCalculated} />
					</div>
				</div>

				{/* EMI Chart */}
				<EMIChart principal={principal} interestRate={interestRate} loanTenure={loanTenure} emi={emi} isCalculated={isCalculated} />
			</div>
		</div>
	);
}
