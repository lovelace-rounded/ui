# 🟣 Rounded

[![hacs][hacs-badge]][hacs-url]
[![release][release-badge]][release-url]
![downloads][downloads-badge]
![build][build-badge]

## What is Rounded ?

Rounded is a collection of cards for [Home Assistant][home-assistant] Dashboard UI.

Rounded mission is to propose easy to use components to build your [Home Assistant][home-assistant] dashboard.

### Features

-   🛠 Editor for **all cards** and and **all options** (no need to edit `yaml`)
-   😍 Icon picker
-   🖌 Color picker
-   🌓 Light and dark theme support
-   🎨 Optional theme customization
-   🌎 Internationalization

## Installation

### HACS

Rounded is available in [HACS][hacs] (Home Assistant Community Store).

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant
3. Go to "Frontend" section
4. Click button with "+" icon
5. Search for "Rounded"

### Manual

1. Download `rounded.js` file from the [latest-release].
2. Put `rounded.js` file into your `config/www` folder.
3. Add reference to `rounded.js` in Dashboard. There's two way to do that:
    - **Using UI:** _Settings_ → _Dashboards_ → _More Options icon_ → _Resources_ → _Add Resource_ → Set _Url_ as `/local/rounded.js` → Set _Resource type_ as `JavaScript Module`.
      **Note:** If you do not see the Resources menu, you will need to enable _Advanced Mode_ in your _User Profile_
    - **Using YAML:** Add following code to `lovelace` section.
        ```yaml
        resources:
            - url: /local/rounded.js
              type: module
        ```

## Usage

All the Rounded cards can be configured using Dashboard UI editor.

1. In Dashboard UI, click 3 dots in top right corner.
2. Click _Edit Dashboard_.
3. Click Plus button to add a new card.
4. Find one of the _Custom: Rounded_ card in the list.


## Credits

The design is inspired by [LE0N][leon]
The codebase is inspired by [Mushroom][mushroom]

<!-- Badges -->

[hacs-url]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/hacs-default-orange.svg?style=flat-square
[release-badge]: https://img.shields.io/github/v/release/lovelace-rounded/ui?style=flat-square
[downloads-badge]: https://img.shields.io/github/downloads/lovelace-rounded/ui/total?style=flat-square
[build-badge]: https://img.shields.io/github/actions/workflow/status/lovelace-rounded/ui/build.yml?branch=main&style=flat-square

<!-- References -->

[home-assistant]: https://www.home-assistant.io/
[home-assitant-theme-docs]: https://www.home-assistant.io/integrations/frontend/#defining-themes
[hacs]: https://hacs.xyz
[mushroom]: https://ui-lovelace-minimalist.github.io/UI/
[leon]: https://community.home-assistant.io/t/rounded-dashboard-guide/543043/2
[release-url]: https://github.com/lovelace-rounded/ui/releases
[documentation-url]: https://lovelace-rounded.github.io