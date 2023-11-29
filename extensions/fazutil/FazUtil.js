(function(Scratch) {
	'use strict';
	
	var characterMoves = {}
	var characterAIs = {}
	
	var maxAILevel = 20;

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	class FazUtil {
		getInfo() {
			return {
				name: 'FazUtil',
				id: 'fazutil',
				description: "A utility extension that's inspired by the game Five Nights at Freddy's",
				by: 'AbsurdCoolMan <https://github.com/AbsurdCoolMan>',
				original: 'AbsurdCoolMan',
				color1: '#fc4744',
				color2: '#e6413e',
				color3: '#cf3836',
				blocks: [
					{
						opcode: 'getGameReleaseDate',
						blockType: Scratch.BlockType.REPORTER,
						text: 'get release date for [GAME]',
						arguments: {
							GAME: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'FNAF 1',
								menu: 'GAME_MENU'
							}
						}
					},
					'---',
					{
						opcode: 'isGameSpinoff',
						blockType: Scratch.BlockType.BOOLEAN,
						text: 'is game[GAME] a spinoff?',
						arguments: {
							GAME: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'FNAF 1',
								menu: 'GAME_MENU'
							}
						}
					},
					{
						opcode: 'wasDevelopedBySteelWool',
						blockType: Scratch.BlockType.BOOLEAN,
						text: 'was game[GAME] developed by Steel Wool Studios?',
						arguments: {
							GAME: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'FNAF 1',
								menu: 'GAME_MENU'
							}
						}
					},
					'---',
					{
						opcode: 'getMovieReleaseDate',
						blockType: Scratch.BlockType.REPORTER,
						text: 'FNAF Movie release date'
					},
					{
						opcode: 'getMarksFamousPhrase',
						blockType: Scratch.BlockType.REPORTER,
						text: 'famous Markiplier phrase'
					},
					{
						opcode: 'getKillersName',
						blockType: Scratch.BlockType.REPORTER,
						text: "killer's name"
					},
					{
						opcode: 'getSuitsStuffedTotal',
						blockType: Scratch.BlockType.REPORTER,
						text: 'total suits stuffed'
					},
					{
						opcode: 'getFNAFWorldCharactersTotal',
						blockType: Scratch.BlockType.REPORTER,
						text: 'total FNAF World characters'
					},
					'---',
					{
						opcode: 'getCharacterAI',
						blockType: Scratch.BlockType.REPORTER,
						text: 'get AI level for character[CHAR]',
						arguments: {
							CHAR: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'character'
							}
						}
					},
					{
						opcode: 'getMaxAILevel',
						blockType: Scratch.BlockType.REPORTER,
						text: 'max AI level'
					},
					'---',
					{
						opcode: 'setCharacterAI',
						blockType: Scratch.BlockType.COMMAND,
						text: 'set AI level for character[CHAR]to[AILEVEL]',
						arguments: {
							CHAR: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'character'
							},
							AILEVEL: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 20
							}
						}
					},
					{
						opcode: 'moveOpportunity',
						blockType: Scratch.BlockType.COMMAND,
						text: 'do move opportunity for character[CHAR]in[SECONDS]seconds',
						arguments: {
							CHAR: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'character'
							},
							SECONDS: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 5
							}
						}
					},
					{
						opcode: 'getCharacterMoveResult',
						blockType: Scratch.BlockType.BOOLEAN,
						text: 'move opportunity result for character[CHAR]',
						arguments: {
							CHAR: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'character'
							}
						}
					},
					'---',
					{
						opcode: 'setMaxAILevel',
						blockType: Scratch.BlockType.COMMAND,
						text: 'set max AI level to[LEVEL]',
						arguments: {
							LEVEL: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: 20
							}
						}
					}
				],
				menus: {
					GAME_MENU: {
						acceptReporters: true,
						items: [
							'FNAF 1',
							'FNAF 2',
							'FNAF 3',
							'FNAF 4',
							'FNAF World',
							'Sister Location',
							'FFPS',
							'UCN',
							'Help Wanted',
							'Special Delivery',
							'Freddy in Space 2',
							"Fury's Rage",
							'Security Breach',
							'Ruin DLC',
							'Freddy in Space 3',
							'Help Wanted 2'
						]
					},
					BOOLEAN_MENU: {
						acceptReporters: false,
						items: ['true', 'false']
					}
				}
			};
		}
		
		getGameReleaseDate(args) {
			var date = '';
			
			switch (args.GAME) {
				case 'FNAF 1':
					date = '8/8/14';
					break;
				case 'FNAF 2':
					date = '11/11/14';
					break;
				case 'FNAF 3':
					date = '3/2/15';
					break;
				case 'FNAF 4':
					date = '7/23/15';
					break;
				case 'FNAF World':
					date = '1/21/16';
					break;
				case 'Sister Location':
					date = '10/7/16';
					break;
				case 'FFPS':
					date = '12/4/17';
					break;
				case 'UCN':
					date = '6/27/18';
					break;
				case 'Help Wanted':
					date = '5/28/19';
					break;
				case 'Special Delivery':
					date = '11/25/19';
					break;
				case 'Freddy in Space 2':
					date = '12/3/19';
					break;
				case "Fury's Rage":
					date = '4/28/21';
					break;
				case 'Security Breach':
					date = '12/16/21';
					break;
				case 'Ruin DLC':
					date = '7/25/23';
					break;
				case 'Freddy in Space 3':
					date = '10/18/23';
					break;
				case 'Help Wanted 2':
					date = '12/14/23';
					break;
				default:
					date = '0/0/00';
			}
			
			return date;
		}
		
		isGameSpinoff(args) {
			var isSpinoff = false;
			
			if (args.GAME == 'FNAF World' || args.GAME == 'Freddy in Space 2' || args.GAME == "Fury's Rage"
			|| args.GAME == 'Freddy in Space 3') {
				isSpinoff = true;
			}
			
			return isSpinoff;
		}
		
		wasDevelopedBySteelWool(args) {
			var wasSteelWoolGame = false;
			
			if (args.GAME == 'Help Wanted' || args.GAME == 'Security Breach' || args.GAME == 'Ruin DLC'
			|| args.GAME == 'Help Wanted 2') {
				wasSteelWoolGame = true;
			}
			
			return wasSteelWoolGame;
		}
		
		getMovieReleaseDate() {
			return '10/27/23';
		}
		
		getMarksFamousPhrase() {
			return 'Was that the bite of 87?';
		}
		
		getKillersName() {
			return 'William Afton';
		}
		
		getSuitsStuffedTotal() {
			return 5;
		}
		
		getFNAFWorldCharactersTotal() {
			return 48;
		}
		
		getCharacterAI(args) {
			var aiLevel = 0;
			
			if (characterAIs[args.CHAR] != null) {
				aiLevel = characterAIs[args.CHAR];
			}
			
			return aiLevel;
		}
		
		getMaxAILevel() {
			return maxAILevel;
		}
		
		setCharacterAI(args) {
			characterAIs[args.CHAR] = args.AILEVEL;
		}
		
		moveOpportunity(args) {
			return new Promise((resolve, reject) => {
				const timeInMilliseconds = args.SECONDS * 1000;
				setTimeout(() => {
					resolve();
					
					var randomNum = getRandomNumber(1, maxAILevel);
					var aiLevel = 0;
					
					if (characterAIs[args.CHAR] != null) {
						aiLevel = characterAIs[args.CHAR];
					}
					
					characterMoves[args.CHAR] = false;
					
					if (aiLevel >= randomNum) {
						characterMoves[args.CHAR] = true;
					}
				}, timeInMilliseconds);
			});
		}
		
		getCharacterMoveResult(args) {
			var canMove = false;
			
			if (characterMoves[args.CHAR]) {
				canMove = true;
			}
			
			return canMove;
		}
		
		setMaxAILevel(args) {
			if (args.LEVEL > 0) {
				maxAILevel = args.LEVEL;
			}
		}
	}

	Scratch.extensions.register(new FazUtil());
})(Scratch);