const {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require("discord.js");
const discordWeek = require('../data/discordWeek.json')
const stacks = require('../data/stacks.json')
const delay = ms => new Promise(res => setTimeout(res, ms));

const awaitMessage = async (member, response) => {
    await member.user.dmChannel.awaitMessages({
        filter: (message) => message.author.id === member.id,
        max: 1,
        time: 3000000,
        errors: 'time'
    }).then(async () => {
        await delay(500);
        await member.send({content: response});
    }).catch(async () => {
        console.log('AwaitMessage Failed : Calling awaitMessage() again');
        await awaitMessage(member, response);
    })
};

const askButton = async (member, bData) => {
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
        await member.send({content: bData.message, components: [bData.row]});
    }
    await member.user.dmChannel.awaitMessageComponent({
        filter: (i) => i.user.id === member.id,
        componentType: 'BUTTON',
        time: 3000000
    }).then(async interaction => {
        bData.row.components[0].setDisabled(true);
        bData.row.components[1].setDisabled(true);
        await delay(750);
        if (interaction.component.customId === 'yes') {
            member.send({content: bData.response[0]});
            await interaction.update({components: [bData.row]});
            if (bData.response[0] === 'Great!😃') {
                const embed = new MessageEmbed()
                    .setTitle('Discord Week')
                    .setColor('#fff')
                    .setDescription('Discord Week is here with amazing sessions on various stacks everyday.  Below are the recurring events in the Discord Week. ')
                    .addFields(discordWeek);
                await delay(1000);
                member.send({embeds: [embed]});
            }
        } else {
            await interaction.update({components: [bData.row]});
            await member.send(bData.response[1]);
        }
    }).catch(async () => {
        console.log('askButton Failed : Calling askButton again');
        bData.awaitFailed = true;
        await askButton(member, bData);
    });
};

const askChoice = async (member, cData) => {
    if (!cData.awaitFailed) {
        cData.row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder(cData.placeholder)
                    .setMinValues(1)
                    .setMaxValues(cData.max_values)
                    .addOptions(cData.choices),
            );
        await delay(1000);
        await member.send({content: cData.message, components: [cData.row]});
    }
    await member.user.dmChannel.awaitMessageComponent({
        filter: (i) => i.user.id === member.id,
        componentType: 'SELECT_MENU',
        time: 3000000
    }).then(async interaction => {
        if (cData.id === 'interestedStack') {
            let message = '';
            interaction.values.map(value => {
                const selectedStack = stacks.filter(stack => stack.id === value)[0];
                message = message + `Checkout <#${selectedStack.channel_id}> for more info about ${selectedStack.name}\n`;
            })
            await interaction.reply({content: message});
        }else {
            await interaction.reply({content: cData.response});
            return;
        }
        await delay(1000);
        await member.send({content: cData.response});
    }).catch(async () => {
        console.log('askChoice Failed : Calling again');
        cData.awaitFailed = true;
        await askChoice(member, cData);
    });
}


module.exports = {delay, awaitMessage, askButton, askChoice};