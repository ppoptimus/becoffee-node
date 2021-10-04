const axios = require("axios")
const appConfig = require("./config")

const PushMessageMulticast = (req, res) => {
    const user_id = req.body.user_id
    const message = req.body.message
    const originalContentUrl = req.body.originalContentUrl
    const previewImageUrl = req.body.previewImageUrl
    
	const data = JSON.stringify({
		to: user_id,
		messages: [
			{
				type: "text",
				text: message,
			},
			{
				type: "image",
				originalContentUrl: originalContentUrl,
				previewImageUrl: previewImageUrl,
			},
		],
	})

	const config = {
		method: "post",
		url: appConfig.LINE_MESSAGE_MULTICAST_URL,
		headers: appConfig.LINE_MESSAGE_HEADER,
		data: data,
	}

	axios(config)
		.then(function (response) {
			return res.status(200).json(response.data);
		})
		.catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
            return res.status(error.response.status).json(error.response.data);
          });
} 

module.exports = PushMessageMulticast;