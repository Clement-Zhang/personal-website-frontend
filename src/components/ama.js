export const context = {
    "boom beach": [
        {
            name: "rifleman",
            summary: [
                "The Rifleman is the first troop available in the game. He is unlocked as soon as the game begins.",
                "Riflemen are balanced troops with moderate HP, damage, and medium attack range."
            ],
            stats: {
                "size": 1,
                "move speed": 220,
                "range": 4.7,
                "attack speed": 1,
                "health": [140, 808],
                "damage": [30, 233]
            }
        },
        {
            name: "heavy",
            summary: [
                "The Heavy is the second troop unlocked in the game. He is unlocked at Headquarters level 2.",
                "The Heavy has moderate speed, high health, but low damage and short range."
            ],
            stats: {
                "size": 4,
                "move speed": 230,
                "range": 3.3,
                "attack speed": .1,
                "health": [1000, 7419],
                "damage": [2.6, 20.6]
            }
        },
        {
            name: "zooka",
            summary: [
                "Zookas are the third troop to unlock, at Headquarters Level 5.",
                "Zookas have very high damage and longer range than most troops, with low speed and health."
            ],
            stats: {
                "size": 2,
                "move speed": 180,
                "range": 7.2,
                "attack speed": 2,
                "health": [50, 411],
                "damage": [160, 1540]
            }
        },
        {
            name: "warrior",
            summary: [
                "The Warrior is the fourth troop unlocked in the game. He is unlocked upon reaching Headquarters level 8.",
                "Warriors have moderate health, high speed and good damage along with self-healing attacks at the cost of extremely short range.",
                "Magma Statues do not increase the Warrior's self-healing, as it is a fixed value instead of actual lifesteal."
            ],
            stats: {
                "size": 3,
                "move speed": 300,
                "range": .9,
                "attack speed": 1,
                "health": [400, 1554],
                "damage": [160, 625]
            }
        },
        {
            name: "tank",
            summary: [
                "The Tank is the fifth troop to unlock in the game. It is unlocked at Headquarters level 11.",
                "The Tank has the second slowest movement speed of any troop but has high health, high damage per unit (but relatively average damage for the space it takes), and long range.",
                "Each Tank costs two Gunboat Energy to deploy."
            ],
            stats: {
                "size": 8,
                "move speed": 150,
                "range": 8.2,
                "attack speed": 3.5,
                "health": [2000, 9600],
                "damage": [490, 2880.5]
            }
        },
        {
            name: "medic",
            summary: [
                "The Medic is the 6th troop unlocked, at Headquarters level 15.",
                "The Medic has average health and speed, with the ability to heal all troops from medium range in a small AOE instead of dealing damage.",
                "Critters, Crystal Critters, Cpt. Ruddero, Rocket Choppa and Heavy Choppa cannot be healed.",
                "Medics ignore Flares and follow the closest troop they could heal, prioritizing nearby damaged troops before them. If there are no other non-Medic troops for them to follow, they will just stand still.",
                "Medic healing is not affected by Magma Statues."
            ],
            stats: {
                "size": 5,
                "move speed": 270,
                "range": 4,
                "attack speed": .6,
                "health": [500, 2098],
                "damage": [12, 22.2]
            }
        },
        {
            name: "grenadier",
            summary: [
                "The Grenadier is the seventh troop to unlock. He is unlocked at Headquarters level 16.",
                "The Grenadier has low health and speed, tossing grenades inaccurately from great range that may overshoot their initial targets.",
                "All of Grenadier's projectiles inflict indiscriminate splash damage in their AOE that can set off Mines, Boom Mines, and Shock Mines."
            ],
            stats: {
                "size": 6,
                "move speed": 250,
                "range": 11.3,
                "attack speed": 2,
                "health": [450, 1134],
                "damage": [200, 634]
            }
        },
        {
            name: "scorcher",
            summary: [
                "The Scorcher is the 8th troop unlocked, at Headquarters level 18.",
                "The Scorcher has short range, moderate DPS and decent speed, along with very high health.",
                "After attacking a building for a few seconds, the Scorcher will change targets, provided if there is a valid one nearby. Like Flamethrowers, Scorchers can temporarily ignite their target for five seconds, removing any ice-based effects.",
                "The Scorcher can return to Buildings that it has targeted before.",
                "This behavior can be overridden by Flares.",
                "If a Scorcher does not respond to the flare due to a bug, it will only attack one building until it is destroyed. This is remedied by using a second Flare to force a retarget.",
                "When destroyed, the Scorcher explodes, which deals damage to nearby Buildings and Troops. This value is not subject to magma statues.",
                "Each Scorcher costs 8 Gunboat Energy to deploy.",
            ],
            stats: {
                "size": 14,
                "move speed": 230,
                "range": 3.3,
                "attack speed": .5,
                "health": [25000, 60600],
                "damage": [700, 2390]
            }
        },
        {
            name: "bombardier",
            summary: [
                "The Bombardier is the eleventh Troop unlocked in the game, at Headquarters level 21.",
                "Bombardiers have extreme range and high DPS with pitiful health.",
                "Each Bombardier costs 1 Gunboat Energy to deploy."
            ],
            stats: {
                "size": 8,
                "move speed": 200,
                "range": 12,
                "attack speed": 2.2,
                "health": [250, 810],
                "damage": [2420, 5500]
            }
        },
        {
            name: "mech",
            summary: [
                "The Mech is unlocked at Headquarters level 22. It is also the twelfth and last troop to be unlocked.",
                "It is a short-ranged troop with high health, low speed, average DPS and rapid attacks that briefly disable their targets.",
                "Each Mech costs 6 Gunboat Energy to deploy."
            ],
            stats: {
                "size": 14,
                "move speed": 130,
                "range": 5,
                "attack speed": .1,
                "health": [18600, 24200],
                "damage": [75.8, 94.4]
            }
        }
    ],
    "clash of clans": [
        {
            name: "barbarian",
            summary: [
                "The Barbarian is the first Elixir Troop unlocked in the Barracks. He is a single-target melee troop who targets ground.",
                "He appears as a bare-chested male kilt-clad warrior with an angry, battle-ready expression, hungry for destruction. He has close-cropped blonde hair and a long, yellow horseshoe mustache. In battle, he wields a sword which he uses to attack.",
                "Barbarians have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Barbarians will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 1,
                "move speed": 16,
                "range": .4,
                "attack speed": 1,
                "health": [45, 290],
                "damage": [8, 48]
            }
        },
        {
            name: "archer",
            summary: [
                "The Archer is the second Elixir Troop unlocked in the Barracks once it is upgraded to level 2. She is a single-target ground troop.",
                "She is the first ranged troop unlocked in the Barracks, and the second overall troop unlocked in the game.",
                "The Archer is a female warrior with sharp eyes. She wears a short, light green dress, a hooded cape, a leather belt, and an attached small pouch. She is always barefoot, including all her skins. She has a quiver slung on her back, a gold short bow in her left hand, and a golden band on each of her upper arms.",
                "Archers have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Archers will proceed to attack the nearest structure.",
            ],
            stats: {
                "size": 1,
                "move speed": 24,
                "range": 3.5,
                "attack speed": 1,
                "health": [20, 72],
                "damage": [7, 43]
            }
        },
        {
            name: "giant",
            summary: [
                "The Giant is the third Elixir Troop unlocked in the Barracks. The Giant's first target is defenses, making him an ideal troop to deploy to get rid of defenses fast. However, due to his low attack damage he is better used in large groups.",
                "While he is low in attack damage, he makes up for it by having a high amount of hitpoints, which makes him a useful tank for lighter troops in support.",
                "Giants prioritize defensive structures above all other targets, and will bypass all other types of enemy buildings and troops while any defenses remain on the battlefield. This is true even if they are under attack by enemy Clan Castle troops, heroes or Skeleton Trap skeletons. Note that like all troops that prioritize defenses, Giants do not consider the Clan Castle to be a defense regardless of whether or not it contains enemy troops, but do consider the activated Town Hall weapon (if any) to be defensive buildings.",
                "Once all defenses are destroyed, Giants become like any other troop with no preferred target; they will attack the nearest building to them regardless of type, and will turn and attack enemy units if they become aware of any nearby and can fight back against them. However, they will not switch targets to enemy units until their previous target was destroyed."
            ],
            stats: {
                "size": 5,
                "move speed": 12,
                "range": 1,
                "attack speed": 2,
                "health": [300, 2600],
                "damage": [22, 204]
            }
        },
        {
            name: "goblin",
            summary: [
                "The Goblin is the fourth Elixir Troop to be unlocked once the Barracks is upgraded to level 4. He is a very fast ground troop that prioritizes resource buildings, dealing double damage to them.",
                "Goblins prioritize resource buildings above all other targets, and will bypass all other types of enemy buildings and troops while any resource buildings remain on the battlefield. This is true even if they are under attack by enemy Clan Castle troops, heroes or Skeleton Trap skeletons. Note that like all troops that prioritize resources, Goblins consider the Clan Castle and the Town Hall to be resource buildings regardless of whether or not they contain loot and whether or not the Town Hall's weapon (if any) is activated; Goblins will preferentially target them in addition to causing double damage to them.",
                "Once all resource buildings are destroyed, Goblins become like any other troop with no preferred target; they will attack the nearest building to them regardless of type, and will turn and attack enemy units if they become aware of any nearby and can fight back against them.",
                "The Goblin deals double damage to resource buildings, (Town Halls and Clan Castles, Gold Mines, Elixir Collectors, Dark Elixir Drills and storages for each). This means that he deals more than twice as much damage as Barbarians and three times as much as Archers to these types of buildings. The trade-off is his relatively low health, which is higher than an Archer's but lower than a Barbarian's.",
                "Because the nature of the Goblin is to attack resource buildings first, they can be vulnerable to attack and should not be deployed without another type of troop (such as Giants or Barbarians) as a meat shield.",
                "The Goblin is one of the fastest ground units in the game. His speed allows him to outrun certain defenses and traps, such as the Spring Trap and Bomb."
            ],
            stats: {
                "size": 1,
                "move speed": 32,
                "range": .4,
                "attack speed": 1,
                "health": [25, 146],
                "damage": [22, 144]
            }
        },
        {
            name: "wall breaker",
            summary: [
                "The Wall Breaker is the fifth Elixir Troop unlocked in the Barracks once it has been upgraded to level 5. As its name suggests, Wall Breakers favor going after Walls, dealing massive damage to them.",
                "The Wall Breaker attacks by locating the nearest protected (read: Wall enclosed) building and destroying its protective Walls, blowing itself up in the process. It deals splash damage around its target and deals 40x damage to Walls.",
                "Wall Breakers prioritize Walls above all other targets, and will completely ignore any building or enemy troop while even a single segment of Wall exists on the battlefield.",
                "If all Wall segments are destroyed, Wall Breakers become like any other troop with no preferred target; they will attack the nearest building to them regardless of type, and will turn and attack enemy units if they become aware of any nearby and can fight back against them."
            ],
            stats: {
                "size": 2,
                "move speed": 24,
                "range": 1,
                "attack speed": 1,
                "health": [20, 160],
                "damage": [480, 7600]
            }
        },
        {
            name: "balloon",
            summary: [
                "The Balloon is the sixth overall Elixir Troop unlocked in the Barracks, and is the first aerial unit unlocked in the Home Village, requiring a level 6 Barracks.",
                "Balloons are \"promoted\" Wall Breakers that now attack from a hot air balloon. They drop bombs towards the ground within a large area splash radius, dealing heavy damage, which can destroy a wide range of ground targets, but can be easily taken out by any anti-air buildings or air-targeting splash-damaging buildings (such as Air Defenses, Wizard Towers and Scattershots).",
                "Balloons have high damage for their housing space, but low attack range and rate. They also cannot hit air units.",
                "When they are defeated, Balloons drop to the ground and explode, dealing relatively minor damage (as compared to the damage of their bombs).",
                "Balloons prioritize defensive structures above all other targets, and will bypass all other types of enemy buildings and troops while any defenses remain on the battlefield. This is true even if they are under attack by enemy Clan Castle troops, heroes or Skeleton Trap skeletons. Note that like all troops that prioritize defenses, Balloons do not consider the Clan Castle to be a defense regardless of whether or not it contains enemy troops, but do consider the activated Town Hall weapon (if any) to be defensive buildings.",
                "Once all defenses are destroyed, Balloons become like any other troop with no preferred target; they will attack the nearest building to them regardless of type, and will turn and attack enemy units if they become aware of any nearby and can fight back against them. However, they will not switch targets to enemy units until their previous target was destroyed."
            ],
            stats: {
                "size": 5,
                "move speed": 10,
                "range": .5,
                "attack speed": 3,
                "health": [150, 1140],
                "damage": [75, 870]
            }
        },
        {
            name: "wizard",
            summary: [
                "The Wizard is an Elixir Troop unlocked in the level 7 Barracks. He is a fragile ground unit with high splash damage and range.",
                "Wizards are commonly used in large groups for fire support or as a force multiplier (similar to Archers), but they can also be effective in smaller numbers, especially at lower levels.",
                "Wizards have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Wizards will proceed to attack the nearest structure.",

            ],
            stats: {
                "size": 4,
                "move speed": 16,
                "range": 3,
                "attack speed": 1.5,
                "health": [75, 310],
                "damage": [75, 435]
            }
        },
        {
            name: "healer",
            summary: [
                "The Healer is the eighth Elixir Troop unlocked at Barracks level 8, which requires Town Hall level 6. She is a flying unit and the only troop with no attacking capabilities, but can heal any ground troops.",
                "When the Healer is deployed, a pulsating circular aura appears around her. She will heal the closest unit or Hero to her, regardless of how damaged they are. For example, if she has already locked on to your Archer Queen, she will not heal anything else until the Archer Queen is destroyed.",
                "Healers do not heal air units (other Healers, Dragons, Balloons, Minions, Lava Hounds, etc.), unlike a Healing Spell which heals every kind of troop, as well as the Druid. Healers will also not affect any Siege Machines like the Wall Wrecker.",
                "The Healer will not heal if the ground troops have a combined housing space of 2 or less: this means she will not heal a single Barbarian, nor she will heal a Wall Breaker.",
                "Note that Healers will heal Heroes at a reduced rate different from that of other units; keep this in mind when using Healers with your heroes.",
                "Healers cannot attack at all. They are completely unable to defend themselves, and will totally ignore any enemy buildings or troops attacking them. If they have no target to heal, they will simply remain stationary even if they are taking damage.",
                "When defending as a Clan Castle troop, she heals injured Clan Castle troops, Heroes and the Skeletons from Skeleton Trap.",
                "Unlike all other troops, Healers are measured in healing per second (abbreviated as HPS; stated in-game as \"Heal\"), rather than in damage per second.",
                "The same principle applies to the Druid's initial form.",
                "Each additional Healer affecting the same unit after the fourth will have a reduced effect on healing the unit. Only up to seven Healers can have an effect on a unit at a time."
            ],
            stats: {
                "size": 14,
                "move speed": 16,
                "range": 5,
                "attack speed": .7,
                "health": [500, 2000],
                "damage": [25.2, 56],
            }
        },
        {
            name: "dragon",
            summary: [
                "The Dragon is the ninth Elixir troop unlocked at Barracks level 9, which requires Town Hall level 7.",
                "He is a fearsome flying unit capable of attacking both ground and air units, with both high health and damage. Similar to the Wizard, the Dragon's attacks are ranged and deal splash damage, observed when he attacks enemy troops that overlap or over walls.",
                "Dragons have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Dragons will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 20,
                "move speed": 16,
                "range": 3,
                "attack speed": 1.25,
                "health": [1900, 5700],
                "damage": [175, 512.5]
            }
        },
        {
            name: "pekka",
            summary: [
                "The P.E.K.K.A is the tenth Elixir Troop unlocked when the Barracks is upgraded to level 10, which requires Town Hall level 8.",
                "She is a slow, single-target melee troop that has high damage and hitpoints. She attacks by swinging her sword at the nearest ground building or unit.",
                "P.E.K.K.As have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the P.E.K.K.As will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 25,
                "move speed": 16,
                "range": .8,
                "attack speed": 1.8,
                "health": [3000, 8200],
                "damage": [522, 1566]
            }
        },
        {
            name: "baby dragon",
            summary: [
                "The Baby Dragon is the eleventh Elixir Troop unlocked in the Barracks once it has been upgraded to level 11, which requires Town Hall level 9. It is a fearsome flying unit and is capable of attacking both ground and air units with splash damage.",
                "It is essentially a smaller and weaker version of the Dragon, but possesses a much faster attack speed (once its Tantrum ability is active) and takes up less housing space in Army Camps.",
                "When no allied aerial units are within 4.5 tiles from the Baby Dragon, its Tantrum ability becomes active, increasing its attack rate and doubling its damage, though, its movement speed still remains the same.",
                "Baby Dragons have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Baby Dragons will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 10,
                "move speed": 20,
                "range": 2.75,
                "attack speed": 1,
                "health": [1200, 2200],
                "damage": [225, 525]
            }
        },
        {
            name: "miner",
            summary: [
                "The Miner is the twelfth Elixir troop unlocked in the level 12 Barracks, which requires Town Hall level 10.",
                "The Miner is a single-target troop that burrows underground when not engaged with enemy troops or buildings. This allows him to have the useful ability of not being affected by walls and bypassing all traps, but can still receive effects from spells.",
                "Miners have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Miners will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 6,
                "move speed": 32,
                "range": .5,
                "attack speed": 1.7,
                "health": [550, 1600],
                "damage": [136, 272]
            }
        },
        {
            name: "dragon rider",
            summary: [
                "The Dragon Rider is the fifteenth Elixir Troop unlocked in the Barracks when it has been upgraded to level 15, which requires Town Hall level 13. This flying unit is a mechanized dragon ridden by a Skeleton that prioritizes defenses.",
                "The Dragon Rider is a fearsome aerial unit that has high hitpoints and attack damage, but has a moderate movement speed. It is also more powerful and faster than the Dragon and the Electro Dragon, which can make it a preferable choice for taking down defenses.",
                "When defeated, the Dragon Rider will fall to the ground and explode, damaging everything around it similarly to a Balloon.",
                "Dragon Riders prioritize defensive structures above all other targets, and will bypass all other types of enemy buildings and troops while any defenses remain on the battlefield. This is true even if they are under attack by enemy Clan Castle troops, heroes or Skeleton Trap skeletons. Note that like all troops that prioritize defenses, Dragon Riders do not consider the Clan Castle to be a defense regardless of whether or not it contains enemy troops, but do consider the activated Town Hall weapon (if any) to be defensive buildings.",
                "Once all defenses are destroyed, Dragon Riders become like any other troop with no preferred target; they will attack the nearest building to them regardless of type, and will turn and attack enemy units if they become aware of any nearby and can fight back against them. However, they will not switch targets to enemy units until their previous target was destroyed."
            ],
            stats: {
                "size": 25,
                "move speed": 20,
                "range": 4,
                "attack speed": 1.2,
                "health": [4100, 5300],
                "damage": [408, 552]
            }
        },
        {
            name: "thrower",
            summary: [
                "The Thrower is the eighteenth and currently the last Elixir troop unlocked in the Home Village, He is a ground unit with moderate hitpoints and damage but has a long attack range, which can hit both ground and air targets.",
                "Throwers have no preferred target when attacking; they will simply attack the closest building. However, if they become aware of enemy Clan Castle troops, Heroes, or Skeleton Trap skeletons (either by being attacked themselves or by being near another friendly troop under attack), and can fight back against them, they will leave their previously targeted building and instead engage the enemy troops. Once all of the nearby enemy troops are defeated, the Throwers will proceed to attack the nearest structure."
            ],
            stats: {
                "size": 16,
                "move speed": 16,
                "range": 6,
                "attack speed": 2.5,
                "health": [1800, 2100],
                "damage": [450, 500]
            }
        }
    ]
}