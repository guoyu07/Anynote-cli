export class MainController {
    constructor ($timeout, webDevTec, toastr) {
        'ngInject';

        this.awesomeThings = [];
        this.classAnimation = '';
        this.creationDate = 1452132385405;
        this.toastr = toastr;

        this.activate($timeout, webDevTec);
  }
}