Hooks.once('init', () => {
    console.log('Module Talents Custom pour Shadowdark chargé !');
});

Hooks.on('createItem', (item, options, userId) => {
    if (item.type === 'Talent') {
        ui.notifications.info(`Nouveau talent ajouté : ${item.name} !`);
    }
});