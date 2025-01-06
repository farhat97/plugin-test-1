#pragma once

#include <juce_audio_processors/juce_audio_processors.h>

using ParameterLayout = juce::AudioProcessorValueTreeState::ParameterLayout;
using AudioProcessorValueTreeState = juce::AudioProcessorValueTreeState;
using AudioParameterFloat = juce::AudioParameterFloat;
using AudioChannelSet = juce::AudioChannelSet;
using NormalisableRange = juce::NormalisableRange<float>;
using MidiBuffer = juce::MidiBuffer;
using AudioProcessorEditor = juce::AudioProcessorEditor;
using GenericAudioProcessorEditor = juce::GenericAudioProcessorEditor;


namespace audio_plugin {
class PluginProcessor : public juce::AudioProcessor {

public:
  PluginProcessor();
  ~PluginProcessor() override;

  void prepareToPlay(double sampleRate, int samplesPerBlock) override;
  void releaseResources() override;

  bool isBusesLayoutSupported(const BusesLayout& layouts) const override;

  void processBlock(juce::AudioBuffer<float>&, juce::MidiBuffer&) override;
  using AudioProcessor::processBlock;

  juce::AudioProcessorEditor* createEditor() override;
  bool hasEditor() const override;

  const juce::String getName() const override;

  bool acceptsMidi() const override;
  bool producesMidi() const override;
  bool isMidiEffect() const override;
  double getTailLengthSeconds() const override;

  int getNumPrograms() override;
  int getCurrentProgram() override;
  void setCurrentProgram(int index) override;
  const juce::String getProgramName(int index) override;
  void changeProgramName(int index, const juce::String& newName) override;

  void getStateInformation(juce::MemoryBlock& destData) override;
  void setStateInformation(const void* data, int sizeInBytes) override;

  // This is for defining the plugin's parameters
  static ParameterLayout createParameterLayout();
  
  AudioProcessorValueTreeState apvts {*this, nullptr, "Parameters", createParameterLayout()};

private:
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PluginProcessor)
};
}  // namespace audio_plugin
