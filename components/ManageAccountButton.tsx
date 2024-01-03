import { generatePortalLink } from "@/actions/registerActions";

function ManageAccountButton() {
	return (
		<form action={generatePortalLink}>
			<button type="submit">Manage Billing</button>
		</form>
	);
}

export default ManageAccountButton;
