/*
 *  Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var constants = ripple('constants'),
    devices = ripple('devices'),
    event = ripple('event');

function _updateInformationView() {
    var infoPane = document.getElementById(constants.COMMON.DEVICE_INFO),
        infoList = [],
        device = devices.getCurrentDevice(),
        isLandscape = (device.defaultOrientation == "landscape") ? true : false;


    //TODO: refactor this stuff to grab info from API, do this in a loop rather then hardcoded. Better DOM injection approach. This is legacy code


    if (isLandscape) {
      if (device.screen.height !== device.viewPort.landscape.height) {
          infoList.push("<section><label class=\"ui-text-label\">Viewport: </label><span class=\"text-is-selectable\">" + device.viewPort.landscape.width + "x" + device.viewPort.landscape.height + "</span></section>");
      }
    } else {
      if (device.screen.height !== device.viewPort.portrait.height) {
          infoList.push("<section><label class=\"ui-text-label\">Viewport: </label><span class=\"text-is-selectable\">" + device.viewPort.portrait.width + "x" + device.viewPort.portrait.height + "</span></section>");
      }
    }

    infoList.push("<section><label class=\"ui-text-label\">Density: </label><span class=\"text-is-selectable\">" + device.ppi + " PPI</span></section>");

    if (device.mediaQueryEmulation && device.mediaQueryEmulation["-webkit-device-pixel-ratio"]) {
        infoList.push("<section><label class=\"ui-text-label\">CSS Pixel Ratio: </label><span class=\"text-is-selectable\">" + device.mediaQueryEmulation["-webkit-device-pixel-ratio"] + "</span></section>");
        infoList.push("<section><label class=\"ui-text-label\">CSS Pixels: </label><span class=\"text-is-selectable\">" + Math.floor(device.screen.width / device.mediaQueryEmulation["-webkit-device-pixel-ratio"]) + "x" + Math.floor(device.screen.height / device.mediaQueryEmulation["-webkit-device-pixel-ratio"]) + "</span></section>");
    }


    infoPane.innerHTML = infoList.join("");
}

module.exports = {
    panel: {
        domId: "devices-container",
        collapsed: true,
        pane: "left"
    },
    initialize: function () {
        event.on("PlatformChangedEvent", function () {
            _updateInformationView();
        });

        event.on("WidgetInformationUpdated", function () {
            _updateInformationView();
        });

        _updateInformationView();
    }
};
