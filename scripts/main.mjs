Hooks.once('init', () => {
    console.log('Module Talents Custom pour Shadowdark chargé !');

    // Hook pour Maîtrise des Ombres : Avantage sur les jets de discrétion
    libWrapper.register(
        'shadowdark-talents-custom',
        'shadowdark.dice.Roll.prototype._prepareAbilityRoll',
        function (wrapped, ...args) {
            const actor = args[0].actor;
            const ability = args[0].abilityId;
            const isInDarkness = true; // À remplacer par une vérification de lumière (si implémentée)

            // Vérifie si l'acteur a le talent Maîtrise des Ombres
            const hasStealthTalent = actor.items.some(
                item => item.type === 'Talent' && item.system.properties?.advantage?.stealthInDarkness
            );

            if (ability === 'dex' && hasStealthTalent && isInDarkness) {
                args[0].advantage = true;
                ui.notifications.info('Maîtrise des Ombres : Avantage appliqué au jet de discrétion !');
            }

            return wrapped(...args);
        },
        'WRAPPER'
    );

    // Hook pour Force de Titan : Bonus de +2 aux dégâts pour armes à deux mains
    libWrapper.register(
        'shadowdark-talents-custom',
        'shadowdark.dice.Roll.prototype._prepareAttackRoll',
        function (wrapped, ...args) {
            const actor = args[0].actor;
            const item = args[0].item;

            // Vérifie si l'acteur a le talent Force de Titan
            const hasTitanTalent = actor.items.some(
                item => item.type === 'Talent' && item.system.properties?.damageBonus?.twoHandedMelee
            );

            // Vérifie si l'arme est à deux mains (basé sur les propriétés de l'item)
            const isTwoHanded = item.system.properties?.includes('two-handed');

            if (hasTitanTalent && isTwoHanded) {
                args[0].damageBonus = (args[0].damageBonus || 0) + 2;
                ui.notifications.info('Force de Titan : +2 aux dégâts pour arme à deux mains !');
            }

            return wrapped(...args);
        },
        'WRAPPER'
    );

    // Notification quand un talent est ajouté
    Hooks.on('createItem', (item, options, userId) => {
        if (item.type === 'Talent') {
            ui.notifications.info(`Nouveau talent ajouté : ${item.name} !`);
        }
    });
});