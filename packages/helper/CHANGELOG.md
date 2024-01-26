# frontend-modules CHANGELOG

## 2.3.7
## 2.3.8
1. merge modules into search/lerna
2. remove rollup package for meHelper
3. defautLang get lang from vuex store, disable set lang

## 2.3.6
1. hotfix: footer's currency menu not auto selected

## 2.3.5
## 2.3.4
## 2.3.3
1. hotfix: product wrapper will have wrong width when title too long

## 2.3.2
1. change resolve's video card from medium to large

## 2.3.1
1. update mediatype term w/ free

## 2.3.0
1. `davinci resolve` release

## 2.2.7
## 2.2.6
## 2.2.5
## 2.2.4
1. add `davinci resolve` link on navbar
2. update `davinci resolve` siteUrl, site route
3. update `davinci resolve` mediatype term

## 2.2.3
## 2.2.2
1. add rules to stick on page by process.env.VUE_APP_PROJECT_NAME
2. change isArtist, isSearch, isApp const => let

## 2.2.1
1. add artist navbar & rollback footer change

## 2.2.0
1. add artist navbar & footer (deprecated)

## 2.1.29.1
1. add covid19 link on footer

## 2.1.29
1. fix product wrapper collection will display none when thumbnails less than 4

## 2.1.28
1. fix product wrapper collection not show info bar on mobile

## 2.1.27
1. fix product wrapper collection issue

## 2.1.26
1. siteUrl lib add one `shortEngLang(false)`
2. update `artist sales` on navbar

## 2.1.25
## 2.1.24
1. change `artist payout` to `artist sales` on navbar

## 2.1.23
1. navbar add history link

## 2.1.22
1. artist repo navbar change lang bugs

## 2.1.21
1. change artist payout url on navbar

## 2.1.20
1. fix navbar dropdown-menu z-index

## 2.1.19
1. breadcrumb nowrap with text ellipsis

## 2.1.18
1. increase navbar dropdown-menu z-index to stay above content

## 2.1.17
1. video player now use new thumbnails video column

## 2.1.16
1. update ProductWrapper to new API version 2020-02-12
2. audio element format change
3. fix audio free not show download bar issue

## 2.1.15
1. element.url -> element.html.url

## 2.1.14
1. currency cookie write update

## 2.1.13
1. Navbar add org info

## 2.1.12
## 2.1.11
1. terms add en lang for fallback
2. terms add pt

## 2.1.10
1. resync assets folder

## 2.1.9
1. update and sync assets folder

## 2.1.8
1. update avatar fallback image

## 2.1.7
1. env config name align

## 2.1.6
1. set product wrapper use ME-Logo as default loaging icon

## 2.1.5
## 2.1.4
## 2.1.3
1. update footer link
2. fixes v-if error
3. login remove redirect=

## 2.1.2
1. fix navbar checkout icon issue on dark mode

## 2.1.1
1. add google recaptcha declare

## 2.1.0
1. product wrapper deployed to production

## 2.0.72
1. fix music not show tools bug

## 2.0.71
1. add showMediaTypeBadge option for media type badge

## 2.0.70
## 2.0.69
1. update navbar login/signup click

## 2.0.68
## 2.0.67
1. update terms convert kebab-case to snake_case

## 2.0.66
1. update test module

## 2.0.65
## 2.0.64
1. change siteUrl default www, return stage when stage.
2. remove dark mode cookie at sub domain

## 2.0.63
1. fixes Navbar mobile change mt-more click.

## 2.0.62
## 2.0.61
1. disable collection preview when is music

## 2.0.60
1. not initial player when is collection

## 2.0.53
## 2.0.52
1. update productWrapper hover event condition.
2. revert 3d_model and lottie mobile will force expand.

## 2.0.51
## 2.0.50
1. change badge icon color

## 2.0.49
1. fix dark mode cookie config

## 2.0.45
## 2.0.46
## 2.0.47
## 2.0.48
1. ProductWrapper add props: hoverEvent, enablePlayer
2. hoverEvent no with forceExpanded
3. All ElementCard Audio can stop.
4. force 3d-model has hoverEvent.

## 2.0.44
1. change me-module dark mode cookie config

## 2.0.43
1. siteUrl return `www.motionelements.com` if window.location.pathname is page

## 2.0.42
## 2.0.41
## 2.0.40
## 2.0.39
## 2.0.38
1. fix product wrapper bug

## 2.0.37
1. siteUrl return `stage.motionelements.com` if window.location.pathname not www
2. search url change to www.motionelements.com

## 2.0.36
## 2.0.35
1. fix bug

## 2.0.34
1. fix layout issue

## 2.0.33
1. not initial video player when is image, fix lite preview

## 2.0.32
## 2.0.31
## 2.0.30
1. fix audio layout on mobile

## 2.0.29
1. fix add to favorites

## 2.0.28
## 2.0.27
## 2.0.26
## 2.0.25
1. add audio minimal card for search free audio
2. hide inbox

## 2.0.24
1. fix productwrapper text alignment on mobile

## 2.0.23
1. fix product wrapper layout

## 2.0.22
1. fix product wrapper filter similar

## 2.0.21
1. fix product wrapper layout

## 2.0.20
1. fix product wrapper filter similar

## 2.0.19
1. fix product wrapper audio favorites icon

## 2.0.18
1. fix product wrapper preview mp4 issue

## 2.0.17
## 2.0.16
## 2.0.15
## 2.0.14
## 2.0.13
## 2.0.12
1. merge productWrapper to search

## 2.0.10
1. adjust i18n tooltip

## 2.0.9
## 2.0.8
## 2.0.7
## 2.0.6
1. fix collection & badge issue

## 2.0.5
## 2.0.4
## 2.0.3
## 2.0.2
## 2.0.1
1. fix productWrapper issue

## 2.0.0
1. add $term to /helper
2. rename build meUrl -> meHelper, meUrl will not update

## 1.5.14
## 1.5.13
## 1.5.12
1. add cp productWrapper command.
2. AccountSidebar.vue update to use local MenuLanguage, NavTheme.

## 1.5.11
## 1.5.10
## 1.5.9
1. add productWrapper component

## 1.5.8
## 1.5.7
## 1.5.6
1. fix bug : change lang function, apply me-page rule on search & favorite

## 1.5.5
1. change lang function add path match for /search, /favorite

## 1.5.4
1. fixed MenuLanguageDropdown changeLang update.
2. fixed NavBar.vue use components name

## 1.5.3
1. add MenuLanguageDropdown.vue
2. add warning README.md file in /shared
3. remove unused function in Navbar/Footer

## 1.5.2
1. update AccountSidebar.vue test
2. fixed Navbar id unique.

## 1.5.0
1. update Navbar/Footer test.
2. fixed Navbar link wrong address.

## 1.4.1
1. update site.js blog url lang end with '/' slash, article end with char
2. update wpLang() url function
3. update tests

## 1.3.0
1. combine site/siteUrl => meUrl.js
2. split defautLang => lang.js
