#pragma once

#include "PluginProcessor.h"

namespace audio_plugin
{

  // TODO: rename class
  class AudioPluginAudioProcessorEditor : public juce::AudioProcessorEditor
  {
    public:
      explicit AudioPluginAudioProcessorEditor(PluginProcessor&);
      ~AudioPluginAudioProcessorEditor() override;

      void paint(juce::Graphics&) override;
      void resized() override;

    private:
      // This reference is provided as a quick way for your editor to
      // access the processor object that created it.
      PluginProcessor& processorRef;

      // Event handlers for JavaScript
      void handleSliderEvent(const juce::String& id, const juce::var& data);

      juce::WebSliderRelay delayTimeRelay;

      std::unique_ptr<juce::WebSliderParameterAttachment> delayTimeAttachment;

      juce::WebBrowserComponent browserComponent;
  };
}  // namespace audio_plugin
