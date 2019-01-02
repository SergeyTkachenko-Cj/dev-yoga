import React from 'react';
import Header from './Header.js';
import Pomodoro from './Pomodoro.js';
// import 'react-notifications/lib/notifications.css';
// import { NotificationContainer } from 'react-notifications';
// import { NotificationManager } from 'react-notifications';
import Notification from './Notification.js';

class App extends React.Component {

	constructor() {
		super();
			this.state = {
				click: () => this.clickEvents(),
				clickII: () => this.clickSoundEvent(),
				setDate: new Date('December 21, 2017 00:00:10'),
				startStop: false,
				clrClass: "clr_code",
				hdrEmojiClass: "code",
				hdrText: "Code...",
				bg_image: "bg_code",
				interval: 0,
				bg_change: false,
				bg_move: false,
				icon: false,
				soundIcon: true,
				soundBtnClr: "#26374a",
				ignore: true,
      			title: ''
			}
	}

	sound = {
		wav: new Audio('Gong-sound.wav')
	}

	setStateFunc(objKey, objVal) {
			this.setState({[objKey]: objVal});
	}

	clickEvents() {
		this.clickSetInterv();
		this.clickButtonStyle();
		this.clickBgAnim();
	}

	clickBgAnim() {
		if (!this.state.bg_move) {
			document.documentElement.style.animationPlayState = "running";
			this.setStateFunc('bg_move', true);
		} 
		else {
			document.documentElement.style.animationPlayState = "paused";
			this.setStateFunc('bg_move', false);
		}
	}

	clickSoundEvent() {
		this.state.soundIcon ? this.clickSoundBtnChange(0, false) : this.clickSoundBtnChange(1, true);
	}

	clickSoundBtnChange(a, b) {
		this.setStateFunc("soundIcon", b);
		this.sound.wav.volume = a;
	}

	clickSetInterv() {
		this.setStateFunc("click", () => false);

			if (this.state.startStop) {
					clearInterval(this.state.interval);
					this.setStateFunc("startStop", false);
					this.setStateFunc("click", () => this.clickEvents());
			} 
			else { 
					this.countDown();
					clearInterval(this.state.interval);
					this.setStateFunc("interval", setInterval(this.countDown = this.countDown.bind(this), 1000));
			}
	}

	countDown() {
		this.setStateFunc("startStop", true);
		this.setStateFunc("click", () => this.clickEvents());
		this.setStateFunc("setDate", this.clickCount());
	}

	codeOrStretch() {
		if (this.state.hdrText === "Code...") {
			this.colorScheme(["clrClass", "hdrEmojiClass", "hdrText", "bg_image", "soundBtnClr"],
			["clr_stretch", "stretch", "Stretch...", "bg_stretch", "#fff"]);
		} 
		else {
			this.colorScheme(["clrClass", "hdrEmojiClass", "hdrText", "bg_image", "soundBtnClr"],
			["clr_code", "code", "Code...", "bg_code", "#26374a"]);
		}
	}

	colorScheme(arrKey, arrVal) {
		arrKey.forEach((item, index) => this.setStateFunc(item, arrVal[index]));
	}

	clickCount() {
		if (this.state.setDate.getTime() === 1513803600000) {
			clearInterval(this.state.interval);
			this.clickButtonStyle();
			this.clickTimeOut(true);
			this.setStateFunc("startStop", false);
			this.codeOrStretch();
			return new Date('December 21, 2017 00:00:10');
		}
		else {
			const t = this.state.setDate.getTime() - 1000;
			this.clickTimeOut(false);
			return new Date(t)
		}
	}

	clickTimeOut(param) {
		if (param) {
			document.querySelector('.cover_div').style.animation = "clr_chng 2s infinite";
			this.clickBgAnim();
			this.sound.wav.play();
			// NotificationManager.success('You have added a new book!', 'Successful!', 2000);
				const title = 'React-Web-Notification';
				const body = 'Hello';
				const icon = 'http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png';

				const options = {
					body: body,
					icon: icon,
					lang: 'en',
					dir: 'ltr'
				  }
			this.setStateFunc('title', 'TIME OUT!');
			this.setStateFunc('options', options);
		}
		else {
			document.querySelector('.cover_div').style.animation = "none";
		}
	}

	clickButtonStyle() {
		this.state.icon ? this.setStateFunc("icon", false) : this.setStateFunc("icon", true);
	}

	// -------------------------------

	handlePermissionGranted() {
		console.log('Permission Granted');
		this.setState({
		  ignore: false
		});
	  }
	  handlePermissionDenied() {
		console.log('Permission Denied');
		this.setState({
		  ignore: true
		});
	  }
	  handleNotSupported() {
		console.log('Web Notification not Supported');
		this.setState({
		  ignore: true
		});
	  }
	
	  handleNotificationOnClick(e, tag) {
		console.log(e, 'Notification clicked tag:' + tag);
	  }
	
	  handleNotificationOnError(e, tag) {
		console.log(e, 'Notification error tag:' + tag);
	  }
	
	  handleNotificationOnClose(e, tag) {
		console.log(e, 'Notification closed tag:' + tag);
	  }
	
	  handleNotificationOnShow(e, tag) {
		var img = '/to-do-notifications/img/icon-128.png';
		var text = 'HEY! Your task "' + 'bambi' + '" is now overdue.';
		new Notification();
		console.log(e, 'Notification showed tag:' + tag);
	  }
	
	
	render() {
		
	  return (
			<div className="pomodoro_block">
				<div className="cover_div"></div>
				<div className="small_scrn"><span>Screen is too small((</span></div>
				<Header prps={this.state} />
				<Pomodoro prps={this.state} />
				{/* <NotificationContainer /> */}

				<Notification
				ignore={this.state.ignore && this.state.title !== ''}
				notSupported={this.handleNotSupported.bind(this)}
				onPermissionGranted={this.handlePermissionGranted.bind(this)}
				onPermissionDenied={this.handlePermissionDenied.bind(this)}
				onShow={this.handleNotificationOnShow.bind(this)}
				onClick={this.handleNotificationOnClick.bind(this)}
				onClose={this.handleNotificationOnClose.bind(this)}
				onError={this.handleNotificationOnError.bind(this)}
				timeout={5000}
				title={this.state.title}
				options={this.state.options}
				swRegistration={this.props.swRegistration}
				/>
			</div>
	  );
	}
}

export default App;