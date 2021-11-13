const {delay, awaitMessage, askButton} = require('../utils/util')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        await member.send({content:'**Welcome..!**'});
        await delay(1000);
        await member.send({content: '**Hooray, you have just landed on TinkerHub Discord Server. Woohoo!!🎉**'});
        await delay(1000);
        await member.send({content: 'What\'s your good name?'});
        await awaitMessage(member, 'Mmmm..Interesting…!');
        await delay(1000);
        await member.send({content: 'Let’s deep dive into your interests..'});
        await askButton(member, {
            message: 'So, What do you like?',
            buttons: ['Netflix', 'Youtube'],
            styles: ['DANGER', 'DANGER'],
            response: ['Looks like we are like minded 😄', 'Looks like we are like minded 😄'],
            awaitFailed: false
        });
    }
}