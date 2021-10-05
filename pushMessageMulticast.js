const axios = require('axios');

const PushMessageMulticast = (req, res) => {
  const header = req.headers.authorization;
  const url_enpoint = req.body.url_enpoint;
  const user_id = req.body.user_id;
  const message = req.body.message;
  const originalContentUrl = req.body.originalContentUrl;
  const previewImageUrl = req.body.previewImageUrl;

  const data = JSON.stringify({
    to: user_id,
    messages: [
      {
        type: 'text',
        text: message,
      },
      {
        type: 'image',
        originalContentUrl: originalContentUrl,
        previewImageUrl: previewImageUrl,
      },
    ],
  });

  const config = {
    method: 'post',
    url: url_enpoint,
    headers: {
      Authorization: header,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return res.status(200).json(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        return res.status(500).json(error);
      }
      return res.status(error.response.status).json(error.response.data);
    });
};

module.exports = PushMessageMulticast;
