
export default function Ingredient({item, ind}){
	return (
		<li className="list-none" key={ind}>{item.description}: {item.quantity} {item.unit}</li>
	);
}