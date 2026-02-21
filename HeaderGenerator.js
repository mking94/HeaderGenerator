/**
 * HeaderGenerator - A native JavaScript utility for generating realistic HTTP headers.
 * Works in both Browser and Node.js environments.
 */
class HeaderGenerator {
  /**
   * @param {Object} defaultOptions - Default options for header generation.
   */
  constructor(defaultOptions = {}) {
    this.defaultOptions = {
      browser: 'chrome',
      os: 'windows',
      device: 'desktop',
      locales: ['en-US', 'en'],
      ...defaultOptions
    };

    // Common User-Agent templates
    this.userAgents = {
      chrome: {
        windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        macos: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      },
      firefox: {
        windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
        macos: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.2; rv:122.0) Gecko/20100101 Firefox/122.0',
        linux: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0'
      },
      safari: {
        macos: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
        ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
      }
    };
  }

  /**
   * Generates a set of headers based on the provided options.
   * @param {Object} options - Overrides for the default options.
   * @returns {Object} A plain object containing the generated headers.
   */
  getHeaders(options = {}) {
    const config = { ...this.defaultOptions, ...options };
    const headers = {};

    // 1. User-Agent
    headers['User-Agent'] = this._getUserAgent(config.browser, config.os);

    // 2. Accept
    headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';

    // 3. Accept-Language
    if (config.locales && config.locales.length > 0) {
      headers['Accept-Language'] = config.locales.join(',') + ';q=0.9';
    }

    // 4. Accept-Encoding
    headers['Accept-Encoding'] = 'gzip, deflate, br';

    // 5. Common Security Headers (Sec-Fetch-*)
    headers['Upgrade-Insecure-Requests'] = '1';
    headers['Sec-Fetch-Dest'] = 'document';
    headers['Sec-Fetch-Mode'] = 'navigate';
    headers['Sec-Fetch-Site'] = 'none';
    headers['Sec-Fetch-User'] = '?1';

    // 6. Browser-specific Client Hints (for Chrome)
    if (config.browser === 'chrome') {
      headers['Sec-CH-UA'] = '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"';
      headers['Sec-CH-UA-Mobile'] = config.device === 'mobile' ? '?1' : '?0';
      headers['Sec-CH-UA-Platform'] = `"${this._capitalize(config.os)}"`;
    }

    return headers;
  }

  /**
   * Helper to get a User-Agent string.
   * @private
   */
  _getUserAgent(browser, os) {
    const browserAgents = this.userAgents[browser.toLowerCase()];
    if (!browserAgents) return this.userAgents.chrome.windows;
    
    return browserAgents[os.toLowerCase()] || Object.values(browserAgents)[0];
  }

  /**
   * Helper to capitalize strings for headers.
   * @private
   */
  _capitalize(str) {
    if (str === 'macos') return 'macOS';
    if (str === 'ios') return 'iOS';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Converts the headers object to a native Headers instance (Browser only).
   * @param {Object} headersObj 
   * @returns {Headers}
   */
  toNativeHeaders(headersObj) {
    if (typeof Headers !== 'undefined') {
      return new Headers(headersObj);
    }
    throw new Error('Headers API is not available in this environment.');
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeaderGenerator;
}
