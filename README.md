# HeaderGenerator.js

A lightweight, native JavaScript utility for generating realistic HTTP request headers. This library is designed to be dependency-free and compatible with both Node.js and browser environments, making it ideal for web scraping, API interactions, or any scenario requiring dynamic and authentic-looking request headers.

## ✨ Features

-   **Environment Agnostic**: Seamlessly integrates into both Node.js (CommonJS) and modern browser environments.
-   **Realistic User-Agents**: Generates User-Agent strings for various browsers (Chrome, Firefox, Safari) and operating systems (Windows, macOS, Linux, iOS).
-   **Comprehensive Header Set**: Includes essential headers such as `Accept`, `Accept-Language`, `Accept-Encoding`, and modern security-focused headers like `Upgrade-Insecure-Requests` and `Sec-Fetch-*`.
-   **Client Hints Support**: Automatically includes `Sec-CH-UA-*` headers for Chrome-based requests, providing detailed client information.
-   **Customizable**: Allows for easy customization of browser, operating system, device type, and locale settings to tailor header generation to specific needs.

## 🚀 Installation

### Node.js

To use `HeaderGenerator.js` in your Node.js project, simply download the `HeaderGenerator.js` file and place it in your project directory. Then, you can `require` it:

```javascript
const HeaderGenerator = require("./HeaderGenerator");
```

### Browser

For browser environments, include the `HeaderGenerator.js` file as a script in your HTML. The `HeaderGenerator` class will be globally available.

```html
<script src="HeaderGenerator.js"></script>
<script>
  const generator = new HeaderGenerator();
  // ... use generator
</script>
```

## 📖 Usage

### Basic Usage

Initialize the `HeaderGenerator` and retrieve a set of headers:

```javascript
const generator = new HeaderGenerator();
const headers = generator.getHeaders();
console.log(headers);
/*
{
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Sec-CH-UA": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
  "Sec-CH-UA-Mobile": "?0",
  "Sec-CH-UA-Platform": "\"Windows\""
}
*/
```

### Customizing Headers

You can specify options during initialization or when calling `getHeaders` to customize the generated headers. Options passed to `getHeaders` will override the default options set in the constructor.

```javascript
const generator = new HeaderGenerator({
  browser: "firefox",
  os: "linux",
});

const customHeaders = generator.getHeaders({
  locales: ["fr-FR", "fr"],
  device: "desktop",
});
console.log(customHeaders);
/*
{
  "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "fr-FR,fr;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1"
}
*/
```

### Using with `fetch` (Browser)

In a browser environment, you can convert the generated headers into a native `Headers` object for use with the `fetch` API:

```javascript
const generator = new HeaderGenerator();
const headersObj = generator.getHeaders({ browser: "safari", os: "ios", device: "mobile" });

try {
  const nativeHeaders = generator.toNativeHeaders(headersObj);
  
  fetch("https://example.com", {
    method: "GET",
    headers: nativeHeaders,
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
} catch (error) {
  console.error(error.message); // Headers API is not available in this environment.
}
```

## ⚙️ API Reference

### `new HeaderGenerator(defaultOptions)`

Creates a new instance of the `HeaderGenerator`.

-   `defaultOptions` (Object, optional): An object to set default header generation options. These options will be used unless overridden by specific calls to `getHeaders`.
    -   `browser` (String, default: `'chrome'`): The browser to emulate. Supported: `'chrome'`, `'firefox'`, `'safari'`.
    -   `os` (String, default: `'windows'`): The operating system to emulate. Supported: `'windows'`, `'macos'`, `'linux'`, `'ios'`.
    -   `device` (String, default: `'desktop'`): The device type. Supported: `'desktop'`, `'mobile'`.
    -   `locales` (Array<String>, default: `['en-US', 'en']`): An array of language tags for the `Accept-Language` header.

### `getHeaders(options)`

Generates a plain JavaScript object containing HTTP headers based on the configured options.

-   `options` (Object, optional): An object to temporarily override the `defaultOptions` for this specific call. 
-   **Returns**: `Object` - A key-value pair object representing the generated HTTP headers.

### `toNativeHeaders(headersObj)`

Converts a plain headers object into a native `Headers` instance, suitable for browser `fetch` API.

-   `headersObj` (Object, required): The plain JavaScript object of headers to convert.
-   **Returns**: `Headers` - A native `Headers` object.
-   **Throws**: `Error` if the `Headers` API is not available (e.g., in Node.js without a polyfill).

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the `HeaderGenerator`.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
