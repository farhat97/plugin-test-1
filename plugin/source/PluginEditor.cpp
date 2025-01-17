#include "PluginTest/PluginEditor.h"
#include "PluginTest/PluginProcessor.h"

namespace audio_plugin 
{
  AudioPluginAudioProcessorEditor::AudioPluginAudioProcessorEditor(
      PluginProcessor& p) : AudioProcessorEditor(&p), processorRef(p) 
  {
    juce::ignoreUnused(processorRef);
    // Make sure that before the constructor has finished, you've set the
    // editor's size to whatever you need it to be.
    setSize(400, 300);
  }

  AudioPluginAudioProcessorEditor::~AudioPluginAudioProcessorEditor() {}

  void AudioPluginAudioProcessorEditor::paint(juce::Graphics& g) 
  {
    // (Our component is opaque, so we must completely fill the background with a
    // solid colour)
    g.fillAll(
        getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));

    // Trying out some gui functions like drawEllipse
    juce::Rectangle rect = juce::Rectangle(27.0f, 27.0f, 27.0f, 27.0f);
    g.drawEllipse(rect, 4.0f);

    g.setColour(juce::Colours::white);
    g.setFont(15.0f);
    g.drawFittedText("Hello World!", getLocalBounds(),
                    juce::Justification::centred, 1);
  }

  void AudioPluginAudioProcessorEditor::resized() 
  {
    // This is generally where you'll want to lay out the positions of any
    // subcomponents in your editor..
  }
}  // namespace audio_plugin
