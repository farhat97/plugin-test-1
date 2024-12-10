# plugin-test-1
Audio plugin using JUCE framework


### To build and run on Linux:
- Run the initial cmake command to generate the build directory: `cmake -S . -B build`
    - Note that this will take a while since it will download JUCE and other stuff

- Build by running the following command `cmake --build build`

In order to run the standalone plugin, navigate to: `build > plugin > PluginTest_artefacts > Standalone` and run the `AudioTest` executable