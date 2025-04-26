import {formatCurrency} from "@/lib/utils";

export const CustomTooltip = ({active, payload, label}: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md'>
				<p className='font-medium mb-1'>{`Period: ${label}`}</p>
				{payload.map((entry: any, index: number) => (
					<div key={`tooltip-item-${index}`} className='flex items-center gap-2 mb-0.5'>
						<div className='w-3 h-3 rounded-full' style={{backgroundColor: entry.color}} />
						<p className='text-sm'>
							<span className='font-medium'>{entry.name}: </span>
							<span>{entry.value ? formatCurrency(entry.value) : "₹0"}</span>
						</p>
					</div>
				))}
			</div>
		);
	}
	return null;
};
