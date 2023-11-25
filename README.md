# Hexo i18n Post Generator

This plugin currently tested on Hexo 4.3.1. It may not work on other versions. This plugin will add the language to the path of the post. For example, if you have a post named `hello-world`, and you have two languages, `en`(default) and `zh-CN`, then the path of the post will be like `2022/01/01/hello-world/` and `zh-CN/2022/01/01/hello-world/`. It also support group by post, which means the path will be like `2022/01/01/hello-world/` and `2022/01/01/hello-world/zh-CN/`.

## Installation

```bash
npm install hexo-generator-i18n-post --save
```

## Usage

Add configuration in your `_config.yml`:

```yaml
# i18n post generator config
i18n_post_generator:
  # `group_by` available value is `post`, `lang`, default is `post`
  group_by: post
  # identifier_field is used to identify the unique post, default is `slug`, however, a custom field is recommended
  identifier_field: slug
```

- `group_by` is used to group the posts, if you set it to `post`, then the posts will be grouped by post, if you set it to `lang`, then the posts will be grouped by lang. e.g. if group_by is `post`, the path will be like: `:year/:month/:day/:title/:lang/`, otherwise group_by is `lang`, the path will be like: `:lang/:year/:month/:day/:title/`. However, if you set permalink pattern in your hexo root config to `:year/:month/:day/:title/`, then there would be potential path issue. For example, if you have a post named `hello-world`, and you have two languages, `en` and `zh-CN`, then the path of the post will be like `2022/01/01/hello-world/` and `en/2022/01/01/hello-world/`, but if the date of these two posts are different, then the path will be like `2022/01/01/hello-world/` and `en/2022/01/02/hello-world/`, which will not work if you use the default language switcher by Hexo. So, if you want to use this plugin, you'd better set permalink pattern to `:title` or use a custom switcher.
- `identifier_field` is used to identify the unique post, default is `slug`, however, a custom field is recommended since `slug` is not unique in some cases, e.g. `source/_data/2019-01-01-hello-world.md` and `source/_data/en/2019-01-01-hello-world.md` will have different slug but we want them to be the same post. If you still want to use `slug`, it will help you to trim the `en/` by split the slug with `/`, but it doesnot always work for all general cases.

## TODO

- [ ] Add hexo cli plugin to generate i18n post


## Misc

To set the header(menu-item) link for each language, you can change the template for url in your theme, for example, in NexT theme, you can change the template in `themes/next/layout/_partials/header/menu-item.njk`:

```njk
{# ... #}
{% if page.lang == languages[0] %}
    {%- set itemURL = node.path %}
{% else %}
    {%- set itemURL = page.lang + '/' + node.path %}
{% endif %}
{{- next_url(itemURL, menuIcon + menuText + menuBadge, {rel: 'section'}) -}}
{# ... #}
```

where `languages[0]` is the default language, and `page.lang` is the language of the current page.
