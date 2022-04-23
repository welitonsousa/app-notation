
import { AxiosResponse } from "axios";
import { Vue } from "vue-property-decorator";

class Message extends Vue {
	error(error: any) {
		try {
			this.$q.notify({
				message: error.response.data.message,
				color: "red-5",
			});
		} catch (e) {
			this.$q.notify({
				message: "Ops. algo deu errado",
				color: "red-5",
			});
		}
	}
	success(response: AxiosResponse) {
		this.$q.notify({
			message: response.data.message,
			color: "green",
		});
	}
}

const showMessage = new Message()
export { showMessage }
