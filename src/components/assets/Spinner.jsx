import React from 'react';

/**
 * Simpler spinner animation for loading
 * Takes in an optional msg to display
 * @param {*} param0
 * @returns Returns the JSX for the spinner
 */
function Spinner({ msg }) {
	return (
		<div className="w-100 mt-20 h-full w-full flex items-center justify-center">
			<div className="snippet" data-title=".dot-flashing">
				<div className="stage flex flex-col items-center justify-center">
					<p className="mb-3 text-lg font-medium">{msg}</p>
					<div className="dot-flashing"></div>
				</div>
			</div>
		</div>
	);
}

export default Spinner;
