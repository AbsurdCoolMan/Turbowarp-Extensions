// Author: AbsurdCoolMan :)
// Happy Easter!

(function(Scratch) {
    'use strict';

    const date = new Date();
    const year = date.getFullYear();

    let eggs = 0;
    let totalEggs = 10;

    // Not my algorithm, but original source doesn't exist anymore.
    function easterDay(year, getWhat) {
        var c = Math.floor(year / 100);
        var n = year - 19 * Math.floor(year / 19);
        var k = Math.floor((c - 17) / 25);
        var i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
        i = i - 30 * Math.floor(i / 30);
        i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
        var j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4);
        j = j - 7 * Math.floor(j / 7);
        var l = i - j;
        var m = 3 + Math.floor((l + 40) / 44);
        var d = l + 28 - 31 * Math.floor(m / 4);

        var date = '';
        switch (getWhat) {
            case 'day':
                date = d;
                break;
            case 'month':
                date = m;
                break;
            default:
                date = m + '/' + d + '/' + year;
        }

        if (year < 1) {
            date = 'the year cannot be lower than one';
        }

        return date;
    }

    function checkEggs() {
        if (eggs >= totalEggs) {
            Scratch.vm.runtime.startHats('easterutil_whenCollectedAllEggs', {});
        }
    }

    class EasterUtil {
        getInfo() {
            return {
                id: 'easterutil',
                name: 'Easter Util',
                color1: '#ff99ff',
                blocks: [
                    {
                        opcode: 'whenCollectedAllEggs',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when all eggs are collected',
                        isEdgeActivated: false
                    },
                    '---',
                    {
                        opcode: 'setEggs',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set eggs to [NUMBER]',
                        arguments: {
                            NUMBER: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'changeEggs',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'change eggs by [NUMBER]',
                        arguments: {
                            NUMBER: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setTotalEggs',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set total eggs to [NUMBER]',
                        arguments: {
                            NUMBER: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        }
                    },
                    {
                        opcode: 'changeTotalEggs',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'change total eggs by [NUMBER]',
                        arguments: {
                            NUMBER: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'collectedAllEggs',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'collected all eggs?',
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'getEasterDate',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[TYPE] of easter of year [YEAR]',
                        arguments: {
                            YEAR: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: year
                            },
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'date',
                                menu: 'DATETYPES'
                            }
                        }
                    },
                    {
                        opcode: 'isEasterToday',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is easter today?',
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'getEggs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'eggs'
                    },
                    {
                        opcode: 'getTotalEggs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'total eggs'
                    }
                ],
                menus: {
                    DATETYPES: {
                        acceptReporters: false,
                        items: [
                            'date',
                            'month',
                            'day'
                        ]
                    }
                }
            };
        }

        // COMMANDS
        setEggs(args) {
            eggs = args.NUMBER;
            checkEggs();
        }

        changeEggs(args) {
            eggs += args.NUMBER;
            checkEggs();
        }

        setTotalEggs(args) {
            totalEggs = args.NUMBER;
            checkEggs();
        }

        changeTotalEggs(args) {
            totalEggs += args.NUMBER;
            checkEggs();
        }

        // BOOLEANS
        collectedAllEggs() {
            return eggs >= totalEggs;
        }

        isEasterToday() {
            var easterD = easterDay(year, 'day');
            var easterM = easterDay(year, 'month');
            var day = date.getDate();
            var month = date.getMonth();
            return day == easterD && month == easterM;
        }

        // REPORTERS
        getEasterDate(args) {
            return easterDay(args.YEAR, args.TYPE);
        }

        getEggs() {
            return eggs;
        }

        getTotalEggs() {
            return totalEggs;
        }
    }

    Scratch.extensions.register(new EasterUtil());
})(Scratch);