const { green, blue } = require("colorette");

const socket = (io) =>
  io.on("connection", (stream) => {
    console.log(green("[Socket.IO] connection established successfully."));

    stream.on("send_employment", (data) =>
      stream.broadcast.emit("receive_employment", data)
    );

    stream.on("send_enrollment", (data) =>
      stream.broadcast.emit("receive_enrollment", data)
    );

    stream.on("join_room", (room) => stream.join(room));

    stream.on("logout", (roomId) => stream.to(roomId).emit("logout"));

    stream.emit("me", stream.id);

    console.log(blue(`[${stream.id}] connected to socket.`));
  });

module.exports = socket;
