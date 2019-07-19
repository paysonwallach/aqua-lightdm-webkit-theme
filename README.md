# aqua-lightdm-webkit-theme

![screenshot](https://raw.githubusercontent.com/paysonwallach/aqua-lightdm-webkit-theme/master/screenshots/aqua-lightdm-webkit-theme.png)

A LightDM webkit greeter theme inspired by macOS, based on [lightdm-webkit-theme-macos](https://github.com/ZoomTen/lightdm-webkit-theme-macos), and updated with Catalina in mind.

## Installation

aqua-lightdm-webkit-theme can be installed either from zip or from git. In both cases, apply the theme by modifing `/etc/lightdm/lightdm-webkit-greeter.conf` or `/etc/lightdm/lightdm-webkit2-greeter.conf` as such:

```shell
webkit-theme = aqua
```

### From zip

1. **Download the [Latest Release](https://github.com/paysonwallach/nocturnal/releases/latest)**

2. **Extract the theme**

   ```sh
   unzip -o aqua-lightdm-webkit-theme.zip -d /usr/share/lightdm-webkit/themes/aqua
   ```

### From git

Clone this repository into `/usr/share/lightdm-webkit/themes/aqua`:

```shell
git clone https://github.com/paysonwallach/aqua-lightdm-webkit-theme /usr/share/lightdm-webkit/themes/aqua
```

## Customization

By default, the theme looks for its background image at `/usr/share/backgrounds/current`, which can simply be a symlink to the user's current background. The background image can otherwise be set by modifying the `background` property in `resources/img/style.css`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the matter.

## License

[aqua-lightdm-webkit-theme](https://github.com/paysonwallach/aqua-lightdm-webkit-theme) is licensed under the [GNU General Public License v3.0](https://github.com/paysonwallach/aqua-lightdm-webkit-theme/blob/master/LICENSE).
