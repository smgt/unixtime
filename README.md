# Unixtime

This is a simple Sinatra application that converts time to and from unix timestamps.

[Try it out!](http://unixtime.herokuapp.com)

## API

There is a simple API. It talks JSON. You need to pass the `value` parameter to the `/date` endpoint.

### Value parameter

`value` can consist of a unix timestamp or a date. You can also supply relative times like `1 year ago` and `next week`.
The application uses [Chronic](https://github.com/mojombo/chronic) to try to determine what you mean. On Chronics GitHub
page there is a extensive list of [examples](https://github.com/mojombo/chronic#examples) you can look at to get a hang
of how it works. 

### Return a date from a unix timestamp

**GET /date?value=1346436000**

Response
```javascript
{
  unixtime: 1346436000,
  date: "2012-08-31 18:00:00 +0000"
}
```

### Return a unix timestamp from a date

**GET /date?value=1+year+ago**

Response
```javascript
{
  unixtime: 1314795681,
  date: "2011-08-31 13:01:21 +0000"
}
```
