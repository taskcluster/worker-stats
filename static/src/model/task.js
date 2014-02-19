/* jshint esnext: true */
export default class TaskModel {
  constructor(options={}) {
    this.image = 'ubuntu';
    this.command = [];

    Object.assign(this, options);
  }

  static bashTask(image, command) {
    return new TaskModel({
      image: image,
      command: ['/bin/bash', '-c', command]
    });
  }
}
