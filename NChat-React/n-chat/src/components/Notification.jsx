import { notification } from "antd"
export default function useOpenNotification(msg) {
	return notification.open({
		message: "Tips",
		description: msg,
		onClick: () => {
			console.log("Notification Clicked!")
		},
	})
}
