# plugin-test-1
Audio plugin using JUCE framework


### To build and run on Linux:
*Version of cmake used:* 3.31.2
- Run the initial cmake command to generate the build directory: cmake -S . -B build
    - Note that this will take a while since it will download JUCE and other stuff

- Build by running the following command cmake --build build

In order to run the standalone plugin, navigate to: build > plugin > PluginTest_artefacts > Standalone and run the AudioTest executable


---

## JUCE General Info
I've found kinda hard to find documentation in terms of the general knowledge of the framework (Components, Lifecycle, Architecture, etc).

Through some videos and external research I've found some useful info:

### Plugin Architecture
- *Audio Processor*: core class where audio processing happens. Important methods:
    - prepareToPlay: prepares the plugin for playback, allocate buffers
    - processBlock: process audio samples in real time. Seems like a "block" is how audio is represented, through AudioBuffer<float>
    - releaseResources: cleans up after playback

- *Audio Processor Editor*: manages the plugin's UI


### Audio Processing Concepts
- *Buffer Handling*: Audio data is passed as juce::AudioBuffer<float> or juce::AudioBuffer<double>. Data is processed per channel or sample

- *Sample Rate and Buffer Size*: The host dictates the sample rate and buffer size

### Misc Useful Concepts
- *AudioProcessorParameter*: use JUCE’s parameter classes (e.g., AudioParameterFloat) for creating automatable parameters.
- *ValueTree*: used to manage parameter state persistently and synchronously between the DSP and GUI.
- *Component*: Seems to be for GUI. Like a react component I'd imagine
    - Seems like these components would be added under the resized() function inside the PluginEditor class