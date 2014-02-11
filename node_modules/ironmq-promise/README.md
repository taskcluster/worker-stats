# ironmq-promise

IronMQ (iron_mq) promise wrapper.


## Usage

```js
var IronMQ = require('ironmq-promise');
var queue = new IronMQ({ queue_name: 'xfoo' });

queue.get({ n: 20 }).then(
  function (messages) {
  }
);
```
