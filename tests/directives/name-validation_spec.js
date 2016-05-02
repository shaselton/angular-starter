describe('Name Validation Directive', function(){
  'use strict';

  var element,
      $scope,
      form;

  beforeEach(module('nameValidationDirective'));

  beforeEach(inject(function($compile, $rootScope){
    $scope = $rootScope;
    element = angular.element('<form name="testForm"><input ng-model="testModel" name="testInput" name-validation /></form>');
    $compile(element)($scope);
    form = $scope.testForm;
    $scope.$digest();
  }));

  describe('name validation directive', function(){
    it('less than four characters', function(){
      form.testInput.$setViewValue('123');
      $scope.$digest();
      expect(form.testInput.$valid).toBe(false);
    });

    it('more than four characters', function(){
      form.testInput.$setViewValue('123456');
      $scope.$digest();
      expect(form.testInput.$valid).toBe(true);
    });
  });
});