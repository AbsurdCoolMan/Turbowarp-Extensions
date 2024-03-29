class RhythmUtil {
    getInfo() {
        return {
            id: 'rhythmutil',
            name: 'Rhythm Util',
            blocks: [
                {
                    opcode: 'canHitNote',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'can hit note with time: [TIME] at song position: [SONGPOS] with safe frames: [FRAMES]',
                    arguments: {
                        TIME: {
                            type: Scratch.ArgumentType.NUMBER
                        },
                        SONGPOS: {
                            type: Scratch.ArgumentType.NUMBER
                        },
                        FRAMES: {
                            type: Scratch.ArgumentType.FRAMES
                        }
                    }
                }
            ]
        };
    }

    canHitNote(args) {
        var time = args.TIME;
        var songPos = args.SONGPOS;
        var frames = args.FRAMES;

        if (time - songPos < frames && time - songPos > frames * 0.5) {
            return true;
        }
        
        return false;
    }
}

Scratch.extensions.register(new RhythmUtil());