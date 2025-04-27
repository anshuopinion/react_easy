import {EMIChart} from "@/components/calculator/chart/EMIChart";
import {InputForm} from "@/components/calculator/InputForm";
import {PaymentBreakDown} from "@/components/calculator/PaymentBreakDown";
import {ResultsDisplay} from "@/components/calculator/ResultsDisplay";
import {cn} from "@/lib/utils";
import {calculateEMI, calculateTotalIntreset, calculateTotalPayment} from "@/utils";
import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	// State for loadn details

	const [principal, setPrincipal] = useState(1000000); // default: 10 Lakhs
	const [interestRate, setInterestRate] = useState(8.5); // default: 8.5%
	const [loanTenure, setLoanTenure] = useState(180); // default: 15 years (180 months)

	// state for calculation of result
	const [emi, setEmi] = useState(0);
	const [totalInterest, setTotalInterest] = useState(0);
	const [totalPayment, setTotalPayment] = useState(0);
	const [isCaclulated, setIsCalculated] = useState(false);

	const handleCaculate = () => {
		console.log({
			principal,
			interestRate,
			loanTenure,
		});

		const emi = calculateEMI(principal, interestRate, loanTenure);
		const totalPayment = calculateTotalPayment(emi, loanTenure);
		const totalInterest = calculateTotalIntreset(totalPayment, principal);

		setEmi(emi);
		setTotalPayment(totalPayment);
		setTotalInterest(totalInterest);
		setIsCalculated(true);
	};

	return (
		<div className='min-h-screen bg-background p-4 md:p-8'>
			<div className={cn("mx-auto  space-y-8", isCaclulated ? "max-w-5xl" : "max-w-xl")}>
				<div className='text-center'>
					<h1 className='text-3xl font-bold tracking-tight'>EMI Calculator</h1>
					<p className='mt-2 text-muted-foreground'>Calculate your loan EMI, total interest payable, and more</p>
				</div>

				<div className={cn("grid grid-cols-1 gap-4", isCaclulated ? "md:grid-cols-2 " : "grid-cols-1")}>
					<div>
						<InputForm
							principal={principal}
							setPrincipal={setPrincipal}
							interestRate={interestRate}
							setInterestRate={setInterestRate}
							loanTenure={loanTenure}
							setLoanTenure={setLoanTenure}
							onCalculate={handleCaculate}
						/>
					</div>
					<div className='space-y-4'>
						<ResultsDisplay emi={emi} totalPayment={totalPayment} totalInterest={totalInterest} isCalculated={isCaclulated} />

						<PaymentBreakDown principal={principal} totalInterest={totalInterest} isCalculated={isCaclulated} />
					</div>
				</div>
				<EMIChart principal={principal} interestRate={interestRate} loanTenure={loanTenure} emi={emi} isCaclulated={isCaclulated} />
			</div>
		</div>
	);
}
