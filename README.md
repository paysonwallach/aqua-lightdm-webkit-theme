# aqua-lightdm-webkit-theme

A LightDM webkit greeter theme inspired by macOS, based on [lightdm-webkit-theme-macos](https://github.com/ZoomTen/lightdm-webkit-theme-macos), and updated with Mojave in mind.

## Installation

Clone this repository into `/usr/share/lightdm-webkit/themes/aqua`:

```shell
git clone https://github.com/paysonwallach/aqua-lightdm-webkit-theme /usr/share/lightdm-webkit/themes/aqua
```
Apply the theme by modifing `/etc/lightdm/lightdm-webkit-greeter.conf` or `/etc/lightdm/lightdm-webkit2-greeter.conf` as such:

```shell
webkit-theme = aqua
```

## Customization

By default, the theme looks for its background image at `/usr/share/backgrounds/current`, which can simply be a symlink to the user's current background. The background image can otherwise be set by modifing the `background` property in `resources/img/style.css`.
