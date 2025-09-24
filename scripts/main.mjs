Hooks.once('init', () => {
    console.log('Module Talents Custom pour Shadowdark chargé !');

    // Hook pour détecter quand un talent est ajouté à un personnage
    Hooks.on('createItem', (item, options, userId) => {
        if (item.type === 'Talent' && item.system.description.includes('Maîtrise des Ombres')) {
            ui.notifications.info(`Nouveau talent ajouté : ${item.name} !`);
        }
    });
});