

export default function ErrorDisplay({msg}){
	return (
		<div className="font-extrabold">Error: <span className="font-semibold">{msg}</span></div>
	);
}