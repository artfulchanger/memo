angular.module('MemoApp.directives', [])
	.directive('pwCheck', [function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
            
          ctrl.$validators.matching = function(modelValue, viewValue) {
			var firstPassword = '#' + attrs.pwCheck;
            var elem2 = angular.element(document.querySelector(firstPassword));
            var match = elem.val() === elem2.val();
            console.log(match);
            return match;
          };
		}
	}
}]);