# search-engines-urls-push

Use this Github Action to push your site urls to search engines(Google, Bing, Baidu)

## Supported Search Engines

- Google
- Bing
- Baidu

## Example usage

```yml
uses: 3Alan/search-engines-urls-push@v0.2.3
with:
  site: ${{ secrets.SITE }}
  sitemap: ${{ secrets.SITEMAP }}
  count: ${{ secrets.COUNT }}
  bing-token: ${{ secrets.BING_TOKEN }}
  baidu-token: ${{ secrets.BAIDU_TOKEN }}
  google-client-email: ${{ secrets.GOOGLE_CLIENT_EMAIL }}
  google-private-key: ${{ secrets.GOOGLE_PRIVATE_KEY }}
```

## Action inputs

| Name                | Description                                                                                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| site                | your site url                                                                                          | true     |
| sitemap             | your sitemap url                                                                                       | true     |
| count               | the numbers of urls pushed to search engines, if empty, all your urls will be pushed                   | false    |
| google-client-email | client_email, [how to get it](https://github.com/3Alan/search-engines-urls-push#google-secrets) | false    |
| google-private-key  | private_key, [how to get it](https://github.com/3Alan/search-engines-urls-push#google-secrets)  | false    |
| bing-token          | Bing API Key, [how to get it](https://github.com/3Alan/search-engines-urls-push#bing-token)     | false    |
| baidu-token         | [how to get it](https://github.com/3Alan/search-engines-urls-push#baidu-token)                  | false    |

## Google secrets

Follow the [tutorial](https://developers.google.com/search/apis/indexing-api/v3/prereqs), you will get a json file containing the `private_key` and `client_email`

## Bing token

[Bing webmasters tool](https://www.bing.com/webmasters), You can get `API Key` from the settings/API access/API Key

## Baidu token

You can find it on this [website](https://ziyuan.baidu.com/linksubmit/index)
