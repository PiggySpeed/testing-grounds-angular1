'use strict';
import angular from 'angular';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($scope) {
    var x = 'firee';
    this.bear = 'bear';
    this.bunnies = 'bunnies!';
    $scope.tree = "HAY HAY";
    $scope.bunnies = "these are bunnies: " + this.bunnies;
    $scope.calculateTree = this.calculateTree;
    $scope.calculateAnimals = {
      bunnies: this.calculateBunnies.bind(this, x)
    }
  }
  calculateTree(value) {
    return (value * 2) + ' trees';
  }
  calculateBunnies(value, x) {
    console.log(x);
    return arguments.length
      ? ('bunnnnnnies!')
      : ('aewf');
  }
}

class JungleController {
  constructor($scope) {
    $scope = {
      monkeys: 100,
      lions: 20
    };
  }

}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .controller('JungleController', JungleController);

export default MODULE_NAME;