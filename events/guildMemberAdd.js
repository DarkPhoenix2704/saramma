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
        await askButton(member, {
            message: 'Let\'s see what we have more in common',
            buttons: ['Twitter', 'Facebook'],
            styles: ['PRIMARY', 'PRIMARY'],
            response: ['Woooh!😮 Are you reading my mind?', 'Woooh!😮 Are you reading my mind?'],
            awaitFailed: false
        });
        await delay(1000);
        await member.send({content: 'I wanna know more about you'});
        await delay(500);
        await askButton(member, {
            message: 'What type are you?',
            buttons: ['Techie', 'Non-Techie'],
            styles: ['SUCCESS', 'DANGER'],
            response: ['Looks like you are one among us…🤩', 'Wanna know more about Tech??'],
            awaitFailed: false
        });
    }
}