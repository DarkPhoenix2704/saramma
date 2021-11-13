const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const discordWeek = require('../data/discordWeek.json')
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
    }).catch(() => {
        console.log('AwaitMessage Failed : Calling awaitMessage() again');
        awaitMessage(member, response);
    });
};

const askButton = (member, bData) => {
    if (!bData.awaitFailed) {
        bData.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('yes')
                    .setLabel(bData.buttons[0])
                    .setStyle(bData.styles[0]),
                new MessageButton()
                    .setCustomId('no')
                    .setLabel(bData.buttons[1])
                    .setStyle(bData.styles[1]),
            );
        member.send({content: bData.message, components: [bData.row]});
    }
    member.user.dmChannel.awaitMessageComponent({
        filter: (i) => i.user.id === member.id,
        componentType: 'BUTTON',
        time: 3000000
    }).then(interaction => {
        bData.row.components[0].setDisabled(true);
        bData.row.components[1].setDisabled(true);
        delay(750);
        if (interaction.component.customId === 'yes') {
            member.send({content: bData.response[0]});
            interaction.update({components: [bData.row]});
            if (bData.response[0] === 'Great!😃') {
                const embed = new MessageEmbed()
                    .setTitle('Discord Week')
                    .setColor('#fff')
                    .setDescription('Discord Week is here with amazing sessions on various stacks everyday.  Below are the recurring events in the Discord Week. ')
                    .addFields(discordWeek);
                delay(1000);
                member.send({embeds: [embed]});
            }
        } else {
            interaction.update({components: [bData.row]});
            member.send(bData.response[1]);
        }
    }).catch(() => {
        console.log('askButton Failed : Calling askButton again');
        bData.awaitFailed = true;
        askButton(member, bData);
    });
}

module.exports = {delay, awaitMessage, askButton};