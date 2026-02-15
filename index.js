const { toMarkdownV2, escapers } = require("@telegraf/entity");
const { Telegraf } = require("telegraf");
const Fastify = require("fastify");

const { TOKEN, DOMAIN, LBA_URL, HOST, PORT } = require("./config");

(async () => {
	// create tg bot instance
	const bot = new Telegraf(TOKEN, { ...(LBA_URL ? { telegram: { apiRoot: LBA_URL } } : {}) });

	bot.start(async (ctx) => {
		// send message on start
		await ctx.reply("Bot ready, you can work with markdown");
	});

	// add bot message handler
	bot.on("message", async (ctx) => {
		try {
			// set text
			let text = toMarkdownV2(ctx.message);

			// send parsed message
			await ctx.reply(text.replace(/\r?\n/g, "\\n").replace(/\r?\\/g, "\\\\"));

			// send message like original
			await ctx.reply(text, { parse_mode: "MarkdownV2" });

			// delete sended by user message
			await ctx.deleteMessage();
		} catch (error) {}
	});

	if (DOMAIN) {
		// set webhook url
		await bot.telegram.setWebhook(`${DOMAIN}/${bot.secretPathComponent()}`, {
			allowed_updates: ["message", "edited_message", "inline_query", "callback_query", "pre_checkout_query"],
			drop_pending_updates: true,
		});

		// create fastify app
		const fastifyApp = Fastify({ trustProxy: true });

		// set webhook handler
		fastifyApp.post(`/${bot.secretPathComponent()}`, async (req, res) => {
			try {
				// set default vars
				let body = req.body || "";
				let update;

				if (req.body != null) {
					// parse body
					if (body instanceof Buffer) body = String(req.body);
					if (typeof body === "string") body = JSON.parse(body);

					// set update value
					update = body;
				} else {
					// parse body
					for await (const chunk of req) body += String(chunk);

					// set update value
					update = JSON.parse(body);
				}

				// handle bot update
				await bot.handleUpdate(update);

				// send success response
				return res.code(200).send();
			} catch (error) {
				// send bad response for telegram retry
				return res.code(415).send();
			}
		});

		// start server
		fastifyApp.listen({ host: HOST, port: PORT }).then((address) => {
			// log
			console.log(`server start at ${address}`);
		});
	} else {
		// start bot polling
		bot.launch({ dropPendingUpdates: true });
	}
})();
