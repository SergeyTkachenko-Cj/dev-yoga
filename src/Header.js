import React from 'react';

const Header = props => {
	let prop = props.prps.setDate.getSeconds();
	return (
		<div className={`header ${props.prps.clrClass}`}>
	  		<span className={props.prps.hdrEmojiClass}></span>
	  		<span>{props.prps.hdrText}</span>
	  		<span className={props.prps.hdrEmojiClass === 'code' ? 'timer_marg_lg timer_sml' : 'timer_marg_sm timer_sml'}>
	  			{props.prps.setDate.getMinutes()}:{prop < 10 ? '0' + prop : prop}
	  		</span>
		  </div>
	)
}

export default Header;