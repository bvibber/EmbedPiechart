var piechart = window.piechart = new (function() {
	
	Raphael.fn.pieSlice = function(x, y, r, startAngle, endAngle) {
		// http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
		var largeArcFlag = (endAngle - startAngle > Math.PI) ? 1 : 0,
			sweepFlag = 1;
		return this.path([
			// Start at center
			'M', x, y,
			// Line to beginning of arc
			'L', x + r * Math.cos(startAngle), y + r * Math.sin(startAngle),
			// Arc across to end...
			'A', r, r, 0, largeArcFlag, sweepFlag, x + r * Math.cos(endAngle), y + r * Math.sin(endAngle),
			// Return to center.
			'Z'
		]);
	};
	
	var colors = [
		'blue',
		'green',
		'cyan',
		'red',
		'magenta',
		'yellow',
		'gray',
	];
	
	function pickColor(i) {
		return colors[i % colors.length];
	}

	this.draw = function(data) {
		var values = data.data,
			labels = data.labels;
		if ( $.isArray(values) && values.length > 0 ) {
			var paper = new Raphael('chart', 640, 480),
				i = 0,
				sum = 0,
				arclen = [],
				arcpos = 0,
				cx = 200,
				cy = 200,
				r = 180;

			for (i = 0; i < values.length; i++) {
				console.log(sum);
				sum += values[i];
			}

			for (i = 0; i < values.length; i++) {
				arclen[i] = (values[i] / sum) * 2 * Math.PI;
			}

			for (i = 0; i < values.length; i++) {
				var pie = paper.pieSlice(cx, cy, r, arcpos, arcpos + arclen[i]);
				arcpos += arclen[i];
				
				pie.attr('fill', pickColor(i));
			}
		}
	}

});

