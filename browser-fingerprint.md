# Fingerprint of Browser

Browsers don't have unique ID, but a good level of fingerprinting is possible. The EFF has measured that, in the best case, information sent by browsers (including the user agent string and other HTTP headers) represent 18.1 bits of entropy, which means if you take two browsers at random, you have 1 chance in 218.1 (≈280,000) that they will have the same "fingerprints". They have set up a website where you can estimate the degree entropy of the information sent by your browser.

Some websites use this. My bank, for instance, stores information about the three browsers I use most often to connect to their website, and ask me additional verification questions whenever I'm not using one of those.

On the other hand, all this information is entirely spoof-able: if someone is able to carry a man-in-the-middle attack and steal a cookie, they are able to steal also all the headers sent by the browser, and can reuse them to authenticate themselves on your website. The same would be true if browsers actually had unique IDs.

Your alternative, besides using a connection encrypted with SSL (https) which requires you to either pay for a signed certificate or create a self-signed one that will display a security warning to your visitors, is to adopt better practice against session high jacking.

For one thing, it is not standard to keep the user name and password, even if encrypted, in the cookie. What you should do is, once a user has logged into your website, assign them a random, single use session ID which you will store in your database along with an expiration time (which you may extend every time the user interacts with your website), and this to them in a cookie.

If you want an even higher degree of protection, one option is to change the session ID every time the user makes sends an HTTP request. You could also store a list of IP addresses each user uses to connect to your website, or IP address masks (e.g. X.Y.*.*) if it changes too often, and have them authenticate themselves if they are connecting from an unusual place. If you do this, it is a good practice to ask them "Will you be connecting again from this place?"

## Using JavaScript to create a GUID from a user’s browser information

There may be a time when you need to assign a unique identifier to a user to monitor their subsequent journey. Perhaps the user is served an advert but the advertiser needs to collect statistics to correlate ad impressions with product purchases.

The trigger for purchasing intentions could be when they click on the “Add to basket” button. Here you will need to inform the server of what item has been has been action and whether this user had previously viewed the advert.

Storing a GUID in a cookie will allow you to connect the two actions together.

* Browsers do not carry any one piece of information that is unique to the user. 
* Everybody has an IP address, but this same IP address could be used by hundreds in a company or by thousands using a VPN.

Using JavaScript, it is possible to string together various values created by global objects like window.navigator and window.screen so as to produce a GUID.

```javascript
/**
 * @function _guid
 * @description Creates GUID for user based on several different browser variables
 * It will never be RFC4122 compliant but it is robust
 * @returns {Number}
 * @private
 */
var guid = function() {

    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
};
```

If you do need to store the user-journey of your visitors then please respect their Do Not Track (DNT) preferences.

Here’s a function you can use for this purpose:

```javascript
/**
   * @function doNotTrack
   * @description Checks if use has declared Do Not Track (DNT) in their browser
   * Ignores IE10: Read this for further explanation: https://en.wikipedia.org/wiki/Do_Not_Track#Internet_Explorer_10_default_setting_controversy
   * @returns {*}
   */

  var doNotTrack = function () {

    if (!window.navigator.userAgent.match(/MSIE\s10\.0|trident\/6\.0/i)) {
      return window.navigator.doNotTrack || window.navigator.msDoNotTrack;
    }
  };
```

## One fingerprint, one user

The above is a means of monitoring a single user for a single session. The information captured is extremely unlikely to change in the course of that session. It’s also completely anonymous. 

Exploiting the JavaScript-based Canvas API, it is possible to create an almost unique identifier for every desktop or handheld device. But it’s not 100% accurate, and AddThis, when announcing their withdrawal from the scheme, claimed that it’s accuracy rate was no higher than 90%.

There is also an open-source library called fingerprint.js that uses the same technique I have demonstrated above, except the author, Valentin Vasilyev, choose to record the browser agent, browser language, screen color depth, installed plugins and their mime types, timezone offset, local storage, and session storage.

These values are then passed through a hashing function to generate further defined individuality. This function uses Murmur, the hashing algorithm used by fingerprint.js:

Today’s browsers, if the user decides opts out of third-party cookie monitoring, are very stringent in enforcing their users’ preferences; which is why so many commercial entities are exploring non-cookie alternatives.

Canvas fingerprinting, used for five months by AddThis, is impossible to remove.

Other cookie alternatives include an exploit of the new HTML5 IndexedDB client-based database and Flash cookies, plus, undoubtedly several techniques yet to be discovered by privacy campaigners.

It’s not that cookies don’t have a role to play in both website functionality and limited commercial activity, but placing long-term, secret trackers on users’ electronic devices is no more ethical than bugging phones and cars to monitor day-to-day activity in the pursuit of profit.

## Fingerprintjs2

## Installation

* CDN: //cdn.jsdelivr.net/npm/fingerprintjs2@<VERSION>/dist/fingerprint2.min.js 
or https://cdnjs.com/libraries/fingerprintjs2
* Bower: bower install fingerprintjs2
* NPM: npm install fingerprintjs2
* Yarn: yarn add fingerprintjs2

## Usage

```javascript
if (window.requestIdleCallback) {
    requestIdleCallback(function () {
        Fingerprint2.get(function (components) {
          console.log(components) // an array of components: {key: ..., value: ...}
        })
    })
} else {
    setTimeout(function () {
        Fingerprint2.get(function (components) {
          console.log(components) // an array of components: {key: ..., value: ...}
        })  
    }, 500)
}
```

**Note:** You should not run fingerprinting directly on or after page load. Rather, delay it for a few milliseconds with **setTimeout** or **requestIdleCallback** to ensure consistent fingerprints. See #307, #254, and others.

On my machine (MBP 2013 Core i5) + Chrome 46 the default FP process takes about 80-100ms. If you use extendedJsFonts option this time will increase up to 2000ms (cold font cache).

To speed up fingerprint computation, you can exclude font detection (~ 40ms), canvas fingerprint (~ 10ms), WebGL fingerprint (~ 35 ms), and Audio fingerprint (~30 ms).

## Options

You choose which components to include in the fingerprint, and configure some other stuff. Example:

```javascript
var options = {fonts: {extendedJsFonts: true}, excludes: {userAgent: true}}
```

For the default options, please see the source code (look for  ```var defaultOptions = {}```).

### excludes

An object of with components keys to exclude. Empty object to include everything. By default most of the components are included (please see the source code for details).

```javascript
var options = {
    excludes: {userAgent: true, language: true}
}
```

To see a list of possible excludes, please see the source code (look for
```var components = []```).

### Constants

The constants used for unavailable, error'd, or excluded components' values.

```javascript
var options = {
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded',
}
```

* NOT_AVAILABLE: Component value if the browser doesn't support the API the component uses (e.g. enumerateDevices) or the browser doesn't provide a useful value (e.g. deviceMemory).
* ERROR: The component function threw an error.
* EXCLUDED: The component was excluded.