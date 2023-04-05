chrome.storage.sync.get('ignoredUrls', function (data) {
    let ignoredUrls = data.ignoredUrls || [];
    let currentUrl = window.location.href;
    let shouldIgnore = ignoredUrls.some(function (ignoredUrl) {
      return currentUrl.startsWith(ignoredUrl);
    });
  
    if (shouldIgnore) {
      $(document).ready(function () {
        $('input').each(function () {
          $(this).attr('data-1p-ignore', '');
        });
        });
    }
    });

  