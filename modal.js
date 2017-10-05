(function($){
	var modalTrigger = $('.morph-btn');
	var modalWindow = $('.morph-modal');

	modalTrigger.on('click', function(event){
		event.preventDefault();
		var selectedModalTrigger = $(this);
		
		var modalId = selectedModalTrigger.attr('href');
		var selectedModalWindow = modalWindow.filter(modalId);
		var selectedMorphBg = selectedModalWindow.children('.morph-background');
		
		selectedModalWindow.addClass('open-modal');

		
		var triggerPosition = getElementPosition(selectedModalTrigger);

		
		var scaleValues = evaluateScale(selectedMorphBg, triggerPosition);
		
		selectedMorphBg.css({
			'top': triggerPosition[0]+'px',
			'left': triggerPosition[1]+'px',
			'transform': 'scaleX(' + scaleValues[1] +') scaleY(' + scaleValues[0] +')',
		}).one('transitionend', function(){
			selectedModalWindow.addClass('modal-visible');
		});

	});

	modalWindow.on('click', '.close-modal', function(event){
		var selectedModalWindow = $(this).parent('.morph-modal');
		var selectedMorphingBackground = selectedModalWindow.children('.morph-background');

		modalWindow.removeClass('modal-visible');
		selectedMorphingBackground.css({
			'transform': 'scaleX(1) scaleY(1)' 
		}).one('transitionend', function(){
			selectedModalWindow.removeClass('open-modal');
		});
	});

	function getElementPosition(trigger) {
		var top = trigger.offset().top - $(window).scrollTop();
		var left = trigger.offset().left;

		return [top, left];
	}

	function evaluateScale(element, position) {
		var scaleY = scaleValue(position[0], element.innerHeight(), $(window).height());
		var scaleX = scaleValue(position[1], element.innerWidth(), $(window).width());

		return [scaleY, scaleX];
	}

	function scaleValue(firstCoordinate, elementDimension, windowDimension) {
		var secondCoordinate = windowDimension - firstCoordinate - elementDimension;
		var maxCoordinate = Math.max(firstCoordinate, secondCoordinate);
		var scaleValue = (maxCoordinate*2 + elementDimension)/elementDimension;
		
		return Math.ceil(scaleValue*10)/10;
	}
})(jQuery);