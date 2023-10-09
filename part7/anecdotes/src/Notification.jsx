import { useContext } from "react"
import AppContext from "./appContext"

const Notification = () => {
	const notification = useContext(AppContext)[2]
	return (
		<div>
			{notification}
		</div>
	)
}

export default Notification