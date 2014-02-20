var Urls = {
  task(model) {
    console.log(model);
    return `task.html?PartitionKey=${model.PartitionKey}&RowKey=${model.RowKey}`;
  }
};

export default Urls;
