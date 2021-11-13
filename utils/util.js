const delay = (time) => {
    setTimeout(() => {
    }, time);
};
const awaitMessage = (member, response) => {
    member.user.dmChannel.awaitMessages({
        filter: (message) => message.author.id === member.id,
        max: 1,
        time: 3000000,
        errors: 'time'
    }).then(() => {
        member.send({content: response});
    }).catch((e) => {
        console.log('AwaitMessage Failed : Calling awaitMessage() again');
        awaitMessage(member, response);
    });
};


module.exports = {delay, awaitMessage};