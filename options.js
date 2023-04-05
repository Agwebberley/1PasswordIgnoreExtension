document.getElementById('urlForm').addEventListener('submit', saveUrl);

function saveUrl(e) {
  e.preventDefault();
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value;
  chrome.storage.sync.get('ignoredUrls', function (data) {
    let ignoredUrls = data.ignoredUrls || [];
    ignoredUrls.push(url);
    chrome.storage.sync.set({ ignoredUrls: ignoredUrls }, function () {
      urlInput.value = '';
      renderUrls();
    });
  });
}

function renderUrls() {
  chrome.storage.sync.get('ignoredUrls', function (data) {
    let ignoredUrls = data.ignoredUrls || [];
    let urlList = document.getElementById('urlList');
    urlList.innerHTML = '';
    ignoredUrls.forEach(function (url, index) {
      let listItem = document.createElement('li');
      listItem.textContent = url;
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remove';
      deleteButton.addEventListener('click', function () {
        removeUrl(index);
      });
      listItem.appendChild(deleteButton);
      urlList.appendChild(listItem);
    });
  });
}

function removeUrl(index) {
  chrome.storage.sync.get('ignoredUrls', function (data) {
    let ignoredUrls = data.ignoredUrls || [];
    ignoredUrls.splice(index, 1);
    chrome.storage.sync.set({ ignoredUrls: ignoredUrls }, renderUrls);
  });
}

document.addEventListener('DOMContentLoaded', renderUrls);
