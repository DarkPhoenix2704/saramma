const {delay, awaitMessage, askButton, askChoice, askYesOrNo} = require('../utils/util')
const stacks = require('../data/stacks.json')
const rating = require('../data/rating.json')
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        await member.send({content: '**Welcome..!**'});
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
        const val = stacks.map(value => {
            return {
                label: value.name,
                description: `${value.description}`,
                value: `${value.id}`
            }
        });
        await askChoice(member, {
            message: 'So what are the stacks that you wish to study or develop?',
            choices: val,
            placeholder: 'Select the interested stack',
            response: 'Looks like we have everything for you😉',
            id: 'interestedStack',
            awaitFailed: false,
            max_values: val.length
        });
        await askChoice(member, {
            message: 'Are you a professional in any of the selected stacks? Rate yourselves in a period of 1 - 5',
            choices: rating,
            placeholder: 'Select the rating',
            response: 'Thanks for your response',
            awaitFailed: false,
            max_values: 1
        });
        await delay(2000);
        await askButton(member, {
            message: 'Do you want to be inspired through wonderful sessions by experienced mentors…',
            buttons: ['Yepp', 'No'],
            styles: ['SUCCESS', 'DANGER'],
            response: ['Great!😃', 'Ohh!😢'],
            awaitFailed: false
        });
    }
}