import React from 'react';
import SvgI from './Svg_I.js';
import SvgII from './Svg_II.js';

const Pomodoro = props => {
	const playPause = props.prps.icon ? "pause" : "play";
	return (
		<div className={`app_cover ${props.prps.bg_image}`}>
			<button className={`${playPause} ${props.prps.clrClass}`} onClick={props.prps.click}></button>
			<button className={`sound_btn ${props.prps.clrClass}`} onClick={props.prps.clickII}>
				<span className="tool_tip_block">Sound</span>
				<SvgI prps={props.prps} />
				<SvgII prps={props.prps} />
			</button>
		</div>
	)
}

export default Pomodoro; 