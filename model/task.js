var Task = {

  /**
  Build an object suitable for insertion into azure tables from the task
  definition and the message queue id.

  @param {String} uuid for record.
  @param {String} queue used for partition key (and also a discrete queue)
  @param {String} messageId from the queue.
  @param {Object} task that was inserted into the queue.
  @return {Object}
  */
  create: function(uuid, queue, messageId, task) {
    return {
      PartitionKey: queue,
      RowKey: uuid,
      queue: queue,
      ironMessageId: messageId,
      task: task
    };
  }

};

module.exports = Task;
