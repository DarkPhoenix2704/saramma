const {delay, awaitMessage, askButton} = require('../utils/util')
module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        member.send({content:'**Welcome..!**'});
        delay(1000);
        member.send({content: '**Hooray, you have just landed on TinkerHub Discord Server. Woohoo!!🎉**'});
        delay(1500);
        member.send({content: 'What\'s your good name?'});
        awaitMessage(member, 'Mmmm..Interesting…!');
        delay(1500);
        member.send({content: 'Let’s deep dive into your interests..'});
        askButton(member, {
            message: 'So, What do you like?',
            buttons: ['Netflix', 'Youtube'],
            styles: ['DANGER', 'DANGER'],
            response: ['Looks like we are like minded 😄', 'Looks like we are like minded 😄'],
            awaitFailed: false
        });
    }
}