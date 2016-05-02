describe('Form Controller', function(){
  'use strict';

  var $httpBackend,
      $scope,
      $controller,
      injectBefore = function(){

      };

  // beforeEach(module('app'));


  

  afterEach(function(){
    // $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequests();
  });

  beforeEach(module('app'));
  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_){
          
          // $httpBackend.when('GET', '/').respond({});
        }));

  it('controller test', inject(function(_$rootScope_, _$controller_, _$httpBackend_){
    $scope = _$rootScope_$new();
          $controller = _$controller_;
          $httpBackend = _$httpBackend_;

          console.log($controller);
    console.log($scope, $controller);
    $controller = $controller('FormCtrl', {scope: $scope});
    expect($scope.testVar).toBe("test value");
  }));

  describe('tester', function(){

  });
});