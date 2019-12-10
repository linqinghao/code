/**
 * 发布/订阅模式
 */

class Publisher {
  constructor() {
    this.id = 0
    this.allTopic = {}
  }

  getAllListeners(topic) {
    return this.allTopic[topic]
  }

  subscribe(topic, f) {
    if (!(topic in this.allTopic)) {
      this.allTopic[topic] = []
    }

    this.allTopic[topic].push({
      id: ++this.id,
      func: f,
    })
  }

  unsubscribe(topic, id) {
    if (!(topic in this.allTopic)) return
    this.allTopic[topic] = this.allTopic[topic].filter(item => item.id == id)
  }

  publish(topic, data) {
    for (let subscriber of this.allTopic[topic]) {
      subscriber.func(data)
    }
  }
}

let publisher = new Publisher()

publisher.subscribe('change', function() {
  console.log('change1')
})

publisher.subscribe('change', function() {
  console.log('change2')
})

publisher.publish('change')

// Output:
// change1
// change2

let sub = publisher.subscribe('sub', function() {
  console.log('sub')
})

console.log(publisher.getAllListeners('sub')) // Output: [ { id: 3, func: [Function] } ]

publisher.unsubscribe('sub', sub)

console.log(publisher.getAllListeners('sub')) // Output: []
