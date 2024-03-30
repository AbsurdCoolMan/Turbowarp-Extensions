(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This example must run unsandboxed');
    }

    var songPosition = 0;

    var bpm = 0;
    var crochet = (60 / bpm) * 1000;
    var stepCrochet = crochet / 4;

    var currentStep = 0;
    var currentBeat = 0;

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
                        opcode: 'whenStepHit',
                        blockType: Scratch.BlockType.HAT,
                        text: 'when step hit',
                        isEdgeActivated: false,
                        shouldRestartExistingThreads: true
                    },
                    {
                        opcode: 'whenBeatHit',
                        blockType: Scratch.BlockType.HAT,
                        text: 'when beat hit',
                        isEdgeActivated: false,
                        shouldRestartExistingThreads: true
                    },
                    '---',
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
                        opcode: 'calculateSteps',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'calculate steps with song length [LENGTH] starting bpm [BPM]',
                        arguments: {
                            LENGTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            BPM: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setBPM',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set BPM to [BPM]',
                        arguments: {
                            BPM: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
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
                    },
                    {
                        opcode: 'getBPM',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'bpm'
                    },
                    {
                        opcode: 'getCurrentStep',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'current step'
                    },
                    {
                        opcode: 'getCurrentBeat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'current beat'
                    }
                ]
            };
        }

        // COMMANDS
        setSongPosition(args) {
            songPosition = args.POS;
        }

        changeSongPosition(args) {
            songPosition += args.AMOUNT;
        }

        calculateSteps(args) {
            var oldStep = currentStep;

            // Calculates steps
            var sections = Math.round(args.LENGTH / 16);
            var stepTime = 0;
            var songTime = 0;

            for (var i = 0; i++; i < sections) {
                stepTime += 16;
                songTime += (((60 / args.BPM) * 1000 / 4) * 16)
            }

            currentStep = stepTime + Math.floor((songPosition - songTime) / stepCrochet);
            currentBeat = Math.floor(currentStep / 4);

            if (oldStep != currentStep && currentStep >= 0) {
                util.startHats('funkinutil_whenStepHit', {});
                if (currentStep % 4 == 0) {
                    util.startHats('funkinutil_whenBeatHit', {});
                }
            }
        }

        setBPM(args) {
            bpm = args.BPM;
            crochet = (60 / bpm) * 1000;
            stepCrochet = crochet / 4;
        }

        // REPORTERS
        getSecsToMilli(args) {
            return args.SECONDS * 1000;
        }

        getMilliToSecs(args) {
            return args.MILLISECONDS / 1000;
        }

        getSongPosition() {
            return songPosition;
        }

        getBPM() {
            return bpm;
        }

        getCurrentStep() {
            return currentStep;
        }

        getCurrentBeat() {
            return currentBeat;
        }
    }

    // Registers the extension
    Scratch.extensions.register(new FunkinUtil());
})(Scratch)