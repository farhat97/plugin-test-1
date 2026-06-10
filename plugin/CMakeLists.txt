cmake_minimum_required(VERSION 3.22)

# Version is needed by JUCE.
project(PluginTest VERSION 0.1.0)

# Adding a directory with the library/application name as a subfolder of the
# include folder is a good practice. It helps avoid name clashes later on.
set(INCLUDE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/include/PluginTest")

# Adds a plugin target (that's basically what the Projucer does).
juce_add_plugin(${PROJECT_NAME}
    COMPANY_NAME FSIS 
    IS_SYNTH FALSE 
    NEEDS_MIDI_INPUT FALSE # may change this
    NEEDS_MIDI_OUTPUT FALSE # may change this
    PLUGIN_MANUFACTURER_CODE MCMP # change this
    PLUGIN_CODE AUPL # change this
    FORMATS Standalone VST3 # may change this
    PRODUCT_NAME "AudioTest" 
)

juce_add_binary_data(PluginTestData                                                                     
    SOURCES
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/home-D_WsxUPk.js
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/entry.client-DjiVrXLW.js
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/root-aw8ZgzUO.js
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/root-DqY-su-W.css
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/ui-component-style-DbTLHB1L.css
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/chunk-EPOLDU6W-B3LbXnth.js
        ${CMAKE_CURRENT_SOURCE_DIR}/../frontend/build/client/assets/manifest-fc3170bf.js
)

# Sets the source files of the plugin project.
target_sources(${PROJECT_NAME}
    PRIVATE
        source/PluginEditor.cpp
        source/PluginProcessor.cpp
        ${INCLUDE_DIR}/PluginEditor.h
        ${INCLUDE_DIR}/PluginProcessor.h
)

# Sets the include directories of the plugin project.
target_include_directories(${PROJECT_NAME}
    PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Links to all necessary dependencies. The present ones are recommended by JUCE.
# If you use one of the additional modules, like the DSP module, you need to specify it here.
target_link_libraries(${PROJECT_NAME}
    PRIVATE
        juce::juce_audio_utils
        juce::juce_gui_extra
        PluginTestData
    PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags
)

# These definitions are recommended by JUCE.
target_compile_definitions(${PROJECT_NAME}
    PUBLIC
        JUCE_WEB_BROWSER=1
        JUCE_USE_CURL=0
        JUCE_VST3_CAN_REPLACE_VST2=0
)

# Enables all warnings and treats warnings as errors.
# This needs to be set up only for your projects, not 3rd party
if (MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE /W4 /WX)
else()
    target_compile_options(${PROJECT_NAME} PRIVATE -Wall -Wextra -Wpedantic)
endif()

# In Visual Studio this command provides a nice grouping of source files in "filters".
source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR}/..)
