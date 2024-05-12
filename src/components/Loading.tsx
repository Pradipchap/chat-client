import Icon from "./Icon";

export default function Loading() {
	return (
		<div className="h-full w-full flex justify-center items-center">
			<Icon name="Loading" className="text-black animate-spin"/>
		</div>
	)
}
