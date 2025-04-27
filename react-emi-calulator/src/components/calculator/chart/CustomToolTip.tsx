import {formatCurrency} from "@/utils";

export const CustomToolTip = ({active, payload, label}: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-background/95  backdrop-blur-sm p-3 border rounded-lg shadow-md'>
				<p className='font-medium mb-1'>{`Period: ${label}`}</p>

				{payload.map((item: any, index: number) => {
					const key = item.name || item.dataKey || "value";
					const value = item.value;
					const color = item.color;

					return (
						<div key={index} className='flex items-center mb-1'>
							<span className='w-3 h-3 rounded-full' style={{backgroundColor: color}}></span>
							<p className='ml-2'>{`${key}: ${value ? formatCurrency(value) : "₹0"}`}</p>
						</div>
					);
				})}
			</div>
		);
	}
};
