import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

/**
 * Alert component
 * @returns Returns JSX to display an alert on a page
 */
function Alert() {
	// Get the alert from the context
	const { alert } = useContext(AlertContext);

	return (
		<div className={`grid grid-cols-1 gap-8 mb-4`} style={{ visibility: alert ? 'visible' : 'hidden' }}>
			<div className={`alert ${alert?.type === 'error' ? 'alert-error' : 'alert-success'}`}>
				<div>
					{alert?.type === 'error' && (
						<svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current mr-3">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
							></path>
						</svg>
					)}
					{alert?.type === 'success' && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					)}
					<strong>{alert?.msg}</strong>
				</div>
			</div>
		</div>
	);
}

export default Alert;
