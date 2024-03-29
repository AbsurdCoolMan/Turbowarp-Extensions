var songPosition = 0

class FunkinUtil {
    getInfo() {
        return {
            id: 'funkinutil',
            name: 'Funkin Util',
            color1: '#f542d1',
            color2: '#b8339d',
            color3: '#661156',
            blocks: [
                {
                    opcode: 'setSongPosition',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set song position to [POS]',
                    arguments: {
                        POS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'changeSongPosition',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'change song position by [AMOUNT]',
                    arguments: {
                        AMOUNT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                '---',
                {
                    opcode: 'getSecsToMilli',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'seconds to milliseconds [SECONDS]',
                    disableMonitor: true,
                    arguments: {
                        SECONDS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'getMilliToSecs',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'milliseconds to seconds [MILLISECONDS]',
                    disableMonitor: true,
                    arguments: {
                        MILLISECONDS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                '---',
                {
                    opcode: 'getSongPosition',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'song position'
                }
            ]
        };
    }

    // COMMANDS
    setSongPosition(args) {
        songPosition = args.POS
    }

    changeSongPosition(args) {
        songPosition += args.AMOUNT
    }

    // REPORTERS
    getSecsToMilli(args) {
        return args.SECONDS * 1000
    }

    getMilliToSecs(args) {
        return args.MILLISECONDS / 1000
    }

    getSongPosition() {
        return songPosition;
    }
}

Scratch.extensions.register(new FunkinUtil());