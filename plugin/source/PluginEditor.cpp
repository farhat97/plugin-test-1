#include "PluginTest/PluginEditor.h"
#include "PluginTest/PluginProcessor.h"
#include <juce_gui_extra/juce_gui_extra.h>
#include <juce_core/juce_core.h>

namespace audio_plugin 
{

  std::optional<juce::WebBrowserComponent::Resource> getResource(const juce::String& url)
  {
    juce::String path = url;

    if (path == "/" || path.isEmpty())
      path = "index.html";
    else
      path = path.fromFirstOccurrenceOf("/", false, false);

    juce::String filename = path.fromLastOccurrenceOf("/", false, false);
    if (filename.isEmpty())
      filename = path;

    // BinaryData naming: dots become underscores
    // "index.js" -> "index_js"
    juce::String resourceName = filename.replace(".", "_");

    int size = 0;
    const char* data = BinaryData::getNamedResource(resourceName.toRawUTF8(), size);

    if (data != nullptr && size > 0)
    {
      std::vector<std::byte> bytes(static_cast<size_t>(size));
      std::memcpy(bytes.data(), data, static_cast<size_t>(size));
      return juce::WebBrowserComponent::Resource{ std::move(bytes), juce::WebBrowserComponent::getMimeType(filename) };
    }

    DBG("Resource not found: " << url << " (looked for: " << resourceName << ")");
    return std::nullopt;
  }

  AudioPluginAudioProcessorEditor::AudioPluginAudioProcessorEditor(
      PluginProcessor& p) :
      AudioProcessorEditor(&p), processorRef(p),
      delayTimeRelay("delayTime"),
      browserComponent(juce::WebBrowserComponent::Options{}
        .withNativeIntegrationEnabled()
        .withResourceProvider([](const juce::String& url) {
          return getResource(url);
        })
        )
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
