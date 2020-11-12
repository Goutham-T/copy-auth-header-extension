// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", function() {
  chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
});

window.addEventListener("unload", function() {
  chrome.debugger.detach({tabId:tabId});
});

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

function onEvent(debuggeerId, message, params) {
  if (
    tabId != debuggeerId.tabId &&
    !params.request.url.includes("graphql")
  )
    return;
  appendResponse(params?.request?.headers);
}

function playSound() {
  const audio = new Audio("https://proxy.notificationsounds.com/sound-effects/just-like-magic-506/download/file-sounds-948-just-like-magic.mp3");
  audio.play();
}

function appendResponse(headers) {
  var container = document.getElementById("container");
  if (container && headers && headers?.authorization) {
    auth = headers.authorization;
    container.innerHTML = auth;
    copyToClipboard(auth);
    playSound();
  }
}
