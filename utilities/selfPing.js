import cron from "node-cron";

function selfPing(url) {
	cron.schedule(" 14/* * * * *", async () => {
		await fetch(url)
			.then((response) => {
				console.log("Pinged...");
				console.log("Response is:", response.status);
			})
	})
}

export default selfPing;
