<div align="center">
  <h1>aqua-lightdm-webkit-theme</h1>
  <img alt="screenshot" src=https://raw.githubusercontent.com/paysonwallach/aqua-lightdm-webkit-theme/master/screenshots/aqua-lightdm-webkit-theme.png>
  <br>
  <br>
  <p>A LightDM webkit greeter theme inspired by macOS, based on <a href=https://github.com/ZoomTen/lightdm-webkit-theme-macos>lightdm-webkit-theme-macos</a>, and updated with Catalina in mind.</p>
  <a href=https://github.com/paysonwallach/aqua-lightdm-webkit-theme/release/latest>
    <img src=https://img.shields.io/github/v/release/paysonwallach/aqua-lightdm-webkit-theme?style=flat-square>
  </a>
  <a href=https://github.com/paysonwallach/aqua-lightdm-webkit-theme/blob/master/LICENSE>
    <img src=https://img.shields.io/badge/license-HIP-994444?style=flat-square>
  </a>
  <a href=https://buymeacoffee.com/paysonwallach>
    <img src=https://img.shields.io/badge/donate-Buy%20me%20a%20coffe-yellow?style=flat-square>
  </a>
  <br>
</div>

## Installation

aqua-lightdm-webkit-theme can be obtained by either downloading a `.zip` file of the contents of the repository, or by cloning the repository via `git`. In either case, the theme may be applied by modifying `/etc/lightdm/lightdm-webkit-greeter.conf` or `/etc/lightdm/lightdm-webkit2-greeter.conf` as such:

```sh
webkit-theme = aqua
```

### From zip

Download the [latest release](https://github.com/paysonwallach/aqua-lightdm-webkit-theme/releases/latest), and extract it to the `lightdm-webkit-greeter` theme directory.

```sh
unzip -o aqua-lightdm-webkit-theme.zip -d /usr/share/lightdm-webkit/themes/aqua
```

### From git

Clone this repository into the `lightdm-webkit-greeter` theme directory.

```sh
git clone https://github.com/paysonwallach/aqua-lightdm-webkit-theme /usr/share/lightdm-webkit/themes/aqua
```

## Customization

By default, the theme looks for its background image at `/usr/share/backgrounds/current`, which can simply be a symlink to the user's current background. Note that this image must be readable by the `lightdm` user. The background image can otherwise be set by modifying the `background` property in `resources/img/style.css`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the matter.

## Code of Conduct

By participating in this project, you agree to abide by the terms of the [Code of Conduct](https://github.com/paysonwallach/aqua-lightdm-webkit-theme/blob/master/CODE_OF_CONDUCT.md).

## License

[aqua-lightdm-webkit-theme](https://github.com/paysonwallach/aqua-lightdm-webkit-theme) is licensed under the [Hippocratic License](https://firstdonoharm.dev).
